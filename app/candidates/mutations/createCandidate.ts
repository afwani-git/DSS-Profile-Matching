import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCandidate = z.object({
  nama: z.string(),
  alamat: z.string().optional().default("Addr Not Set"),
  email: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCandidate), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const candidate = await db.candidate.create({ data: input })

  return candidate
})
