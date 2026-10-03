import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async () => {
  const prisma = getPrismaClient()

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return testimonials
})