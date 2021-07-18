import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCandidatesInput
  extends Pick<Prisma.CandidateFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetCandidatesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: candidates,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.candidate.count({ where }),
      query: (paginateArgs) => db.candidate.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      candidates,
      nextPage,
      hasMore,
      count,
    }
  }
)
