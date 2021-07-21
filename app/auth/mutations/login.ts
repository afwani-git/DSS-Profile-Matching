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

  if (input.password == user.hashedPassword) {

    const role: any = user.role as any

    return ctx.session.$create({ userId: user.id, role })
  }

  throw new AuthenticationError();
})
