import getUserId from "../utils/getUserId";

const Query = {
  users(parent, args, { db, prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          }
        ]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.query.user({
      where: {
        id: userId
      }
    });
  },
  notes(parent, args, { prisma }, info) {
    return prisma.query.notes({}, info);
  },
  myNotes(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.notes({
      where: {
        author: {
          id: userId
        }
      }
    });
  },
  note(parent, { query }, { prisma }, info) {
    return prisma.query.note(
      {
        where: {
          id: query
        }
      },
      info
    );
  }
};

export { Query as default };
