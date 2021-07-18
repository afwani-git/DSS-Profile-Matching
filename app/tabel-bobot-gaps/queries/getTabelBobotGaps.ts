import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTabelBobotGapsInput
  extends Pick<Prisma.TabelBobotGapFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, orderBy, skip = 0, take = 100 }: GetTabelBobotGapsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: tabelBobotGaps,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tabelBobotGap.count({ where }),
      query: (paginateArgs) => db.tabelBobotGap.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tabelBobotGaps,
      nextPage,
      hasMore,
      count,
    }
  }
)
