import { getNotionClient, getServicesDataSourceId } from '../../utils/notion'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing service slug' })
  }

  const notion = getNotionClient()
  const dataSourceId = await getServicesDataSourceId()

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'Slug',
      rich_text: { equals: slug },
    },
  })

  const page = response.results[0] as any

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Service not found' })
  }

  const props = page.properties

  return {
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? '',
    title: props.Name?.title?.[0]?.plain_text ?? '',
    tagline: props.Tagline?.rich_text?.[0]?.plain_text ?? '',
    icon: props.Icon?.rich_text?.[0]?.plain_text ?? '✦',
    price: props.Price?.rich_text?.[0]?.plain_text ?? '',
    description: props.Description?.rich_text?.[0]?.plain_text ?? '',
    includes: (props.Includes?.rich_text?.[0]?.plain_text ?? '')
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean),
    image:
      props.Image?.files?.[0]?.file?.url ??
      props.Image?.files?.[0]?.external?.url ??
      '',
  }
})