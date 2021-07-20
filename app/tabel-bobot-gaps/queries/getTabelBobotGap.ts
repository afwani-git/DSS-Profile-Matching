import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTabelBobotGap = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetTabelBobotGap),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tabelBobotGap = await db.tabelBobotGap.findFirst({ where: { id } })

    if (!tabelBobotGap) throw new NotFoundError()

    return tabelBobotGap
  }
)
