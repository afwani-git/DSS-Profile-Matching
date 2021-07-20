import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCriterion = z.object({
  id: z.number(),
  nama: z.string(),
  bobot: z.number(),
  coreFactor: z.number(),
  secondaryFactor: z.number(),
})

export default resolver.pipe(
  resolver.zod(UpdateCriterion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const criterion = await db.criteria.update({ where: { id }, data })

    return criterion
  }
)
