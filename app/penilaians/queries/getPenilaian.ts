import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPenilaian = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPenilaian), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const penilaian = await db.penilaian.findFirst({ where: { id } })

  if (!penilaian) throw new NotFoundError()

  return penilaian
})
