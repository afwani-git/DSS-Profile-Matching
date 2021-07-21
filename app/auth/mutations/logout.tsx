import { resolver, AuthenticationError, SecurePassword, Ctx } from "blitz"

import db from "db"
import { z } from "zod"


export default resolver.pipe(resolver.authorize(), async (input, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  await ctx.session.$revoke()
})
