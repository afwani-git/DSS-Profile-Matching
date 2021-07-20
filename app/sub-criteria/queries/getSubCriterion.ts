import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSubCriterion = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(GetSubCriterion),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subCriteria = await db.subCriteria.findFirst({ where: { id } })

    if (!subCriteria) throw new NotFoundError()

    return subCriteria
  }
)
