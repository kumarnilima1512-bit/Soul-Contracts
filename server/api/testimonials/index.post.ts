import { getPrismaClient } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name?.trim() || !body.quote?.trim() || !body.category || !body.rating) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const prisma = getPrismaClient()

  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name.trim(),
      category: body.category,
      quote: body.quote.trim(),
      rating: Number(body.rating),
    },
  })

  return testimonial
})