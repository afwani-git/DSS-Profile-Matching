import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSubCriterion = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteSubCriterion),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subCriteria = await db.subCriteria.deleteMany({ where: { id } })

    return subCriteria
  }
)
