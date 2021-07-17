import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCriterion = z.object({
  nama: z.string(),
  bobot: z.number(),
  coreFactor: z.number(),
  secondaryFactor: z.number(),
})

export default resolver.pipe(resolver.zod(CreateCriterion), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const criterion = await db.criteria.create({ data: input })

  return criterion
})
