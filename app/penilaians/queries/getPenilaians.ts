import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPenilaiansInput
  extends Pick<Prisma.PenilaianFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetPenilaiansInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: penilaians,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.penilaian.count({ where }),
      query: (paginateArgs) =>
        db.penilaian.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            candidate: true,
            subCiteria: true,
          },
        }),
    })

    return {
      penilaians,
      nextPage,
      hasMore,
      count,
    }
  }
)
