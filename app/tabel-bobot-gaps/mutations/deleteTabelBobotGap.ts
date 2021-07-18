import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTabelBobotGap = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTabelBobotGap), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tabelBobotGap = await db.tabelBobotGap.deleteMany({ where: { id } })

  return tabelBobotGap
})
