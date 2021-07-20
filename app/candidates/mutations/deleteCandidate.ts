import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCandidate = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteCandidate),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const candidate = await db.candidate.deleteMany({ where: { id } })

    return candidate
  }
)
