import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTabelBobotGap = z.object({
  id: z.number(),
  selisih: z.number(),
  bobtNilia: z.number(),
  keterangan: z.number(),
})

export default resolver.pipe(resolver.zod(UpdateTabelBobotGap), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tabelBobotGap = await db.tabelBobotGap.update({ where: { id }, data })

  return tabelBobotGap
})
