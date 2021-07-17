import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCriterion = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteCriterion), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const criterion = await db.criteria.deleteMany({ where: { id } })

  return criterion
})
