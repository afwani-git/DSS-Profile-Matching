import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTabelBobotGap = z.object({
  selisih: z.number(),
  bobtNilia: z.number(),
  keterangan: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTabelBobotGap), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tabelBobotGap = await db.tabelBobotGap.create({ data: input })

  return tabelBobotGap
})
