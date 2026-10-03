import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing id' })

  const adminPassword = getHeader(event, 'x-admin-password')
  const config = useRuntimeConfig()

  if (!adminPassword || adminPassword !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const prisma = getPrismaClient()
  await prisma.testimonial.delete({ where: { id } })

  return { success: true }
})