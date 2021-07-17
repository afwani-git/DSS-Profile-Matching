import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSubCriterion = z.object({
  id: z.number(),
  nama: z.string(),
  nilaiTarget: z.number(),
  type: z.string(),
})

export default resolver.pipe(resolver.zod(UpdateSubCriterion), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const subCriteria = await db.subCriteria.update({ where: { id }, data })

  return subCriteria
})
