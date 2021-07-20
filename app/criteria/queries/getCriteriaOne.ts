import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCriterion = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetCriterion),
  resolver.authorize(),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const criterion = await db.criteria.findFirst({
      where: { id },
      include: {
        subCriteria: true,
      },
    })

    if (!criterion) throw new NotFoundError()

    return criterion
  }
)
