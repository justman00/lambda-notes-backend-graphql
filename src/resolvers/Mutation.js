import bcrypt from "bcryptjs";
import getUserId from "../utils/getUserId";
import getToken from "../utils/getToken";

const Mutation = {
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: args.data.email } });

    if (!user) {
      throw new Error("Unable to log in");
    }

    const isMatch = bcrypt.compare(args.data.password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    const token = getToken(user.id);

    return { user, token };
  },
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8) {
      throw new Error("Password must be 8 characters or longer");
    }

    const password = await bcrypt.hash(args.data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    });

    return {
      user,
      token: getToken(user.id)
    };
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteUser(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    );
  },
  createNote(parent, { data }, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createNote(
      {
        data: {
          ...data,
          tags: {
            set: data.tags
          },
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  },
  async updateNote(parent, { data, id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const noteExists = await prisma.exists.Note({
      id,
      author: {
        id: userId
      }
    });

    if (!noteExists) {
      throw new Error("Unauthorized");
    }

    const updatedNote = await prisma.mutation.updateNote(
      {
        where: {
          id
        },
        data: {
          ...data,
          tags: {
            set: data.tags
          }
        }
      },
      info
    );

    return updatedNote;
  },
  async deleteNote(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);

    const noteExists = await prisma.exists.Note({
      id,
      author: {
        id: userId
      }
    });

    if (!noteExists) {
      throw new Error("Note does not exist");
    }

    return prisma.mutation.deleteNote(
      {
        where: {
          id
        }
      },
      info
    );
  }
};

export { Mutation as default };
