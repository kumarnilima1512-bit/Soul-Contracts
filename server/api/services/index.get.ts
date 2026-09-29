import { getNotionClient, getServicesDataSourceId } from '../../utils/notion'

export default defineEventHandler(async () => {
  const notion = getNotionClient()
  const dataSourceId = await getServicesDataSourceId()

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
  })

  return response.results.map((page: any) => {
    const props = page.properties
    return {
      slug: props.Slug?.rich_text?.[0]?.plain_text ?? '',
      title: props.Name?.title?.[0]?.plain_text ?? '',
      tagline: props.Tagline?.rich_text?.[0]?.plain_text ?? '',
      icon: props.Icon?.rich_text?.[0]?.plain_text ?? '✦',
      price: props.Price?.rich_text?.[0]?.plain_text ?? '',
    }
  })
})