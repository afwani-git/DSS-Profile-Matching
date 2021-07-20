import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCandidate = z.object({
  id: z.number(),
  nama: z.string(),
  alamat: z.string().optional().default("Addr Not Set"),
  email: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCandidate),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const candidate = await db.candidate.update({ where: { id }, data })

    return candidate
  }
)
