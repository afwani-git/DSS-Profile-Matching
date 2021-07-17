import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSubCriterion = z.object({
  nama: z.string(),
  nilaiTarget: z.number(),
  type: z.string(),
  criteriaId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateSubCriterion), async ({ criteriaId, ...data }) => {
  const criteria = await db.criteria.findFirst({
    where: { id: criteriaId },
  })

  const subCriteria = await db.subCriteria.create({
    data: {
      ...data,
      criteria: {
        connect: {
          id: criteria!.id,
        },
      },
    },
  })

  return subCriteria
})
