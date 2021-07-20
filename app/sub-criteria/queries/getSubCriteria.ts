import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSubCriteriaInput
  extends Pick<Prisma.SubCriteriaFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSubCriteriaInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: subCriteria,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.subCriteria.count({ where }),
      query: (paginateArgs) => db.subCriteria.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      subCriteria,
      nextPage,
      hasMore,
      count,
    }
  }
)
