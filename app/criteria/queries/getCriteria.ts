import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCriteriaInput
  extends Pick<Prisma.CriteriaFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetCriteriaInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: criteria,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.criteria.count({ where }),
    query: (paginateArgs) =>
      db.criteria.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          subCriteria: {
            include: {
              penilaian: {
                include: {
                  candidate: true,
                },
              },
            },
          },
        },
      }),
  })

  return {
    criteria,
    nextPage,
    hasMore,
    count,
  }
})
