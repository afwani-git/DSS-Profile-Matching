import { resolver, AuthenticationError, SecurePassword, Ctx } from "blitz"

import db from "db"
import { z } from "zod"

const AuthInput = z.object({
  email: z.string(),
  password: z.string(),
})

export default resolver.pipe(resolver.zod(AuthInput), async (input, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.findFirst({
    where: {
      email: input.email,
    },
  })

  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, input.password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    const improvedHash = await SecurePassword.hash(input.password)
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword: improvedHash },
    })
  }

  const { hashedPassword, ...rest } = user
  await ctx.session.$create({ userId: user.id, role: user.role })
  return rest
})
