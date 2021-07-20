import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSubCriterion = z.object({
  nama: z.string(),
  nilaiTarget: z.number(),
  type: z.string(),
  criteriaId: z.number(),
})

export default resolver.pipe(
  resolver.zod(CreateSubCriterion),
  resolver.authorize(),
  async ({ criteriaId, ...data }) => {
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

    const candidate = await db.candidate.findMany()
    const listPenilaian: any[] = []

    candidate.map((candidate) => {
      listPenilaian.push(
        db.penilaian.create({
          data: {
            candidateId: candidate.id,
            subCiteriaId: subCriteria.id,
          },
        })
      )
    })

    await db.$transaction(listPenilaian)

    return subCriteria
  }
)
