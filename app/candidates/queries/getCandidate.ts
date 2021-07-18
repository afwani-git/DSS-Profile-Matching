import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCandidate = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCandidate), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const candidate = await db.candidate.findFirst({ where: { id } })

  if (!candidate) throw new NotFoundError()

  return candidate
})
