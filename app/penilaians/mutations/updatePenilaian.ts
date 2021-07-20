import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePenilaian = z.object({
  id: z.number(),
  nilai: z.number(),
})

export default resolver.pipe(resolver.zod(UpdatePenilaian), async ({ id, nilai }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const penilaian = await db.penilaian.update({
    where: {
      id,
    },
    data: {
      nilai,
    },
  })

  return penilaian
})
