import { getNotionClient, getDataSourceId } from '../../utils/notion'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const notion = getNotionClient()
  const dataSourceId = await getDataSourceId(config.notionServicesDatabaseId as string)

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
  })

  return response.results.map((page: any) => {
    const props = page.properties
    return {
      slug: props.Slug?.rich_text?.[0]?.plain_text ?? '',
      title: props.Name?.title?.[0]?.plain_text ?? '',
      tagline: props.Tagline?.rich_text?.[0]?.plain_text ?? '',
      description: props.Description?.rich_text?.[0]?.plain_text ?? '',
      icon: props.Icon?.rich_text?.[0]?.plain_text ?? '✦',
      price: props.Price?.rich_text?.[0]?.plain_text ?? '',
      points: (props.Includes?.rich_text?.[0]?.plain_text ?? '')
        .split('\n')
        .map((s: string) => s.trim())
        .filter(Boolean),
      image:
        props.Image?.files?.[0]?.file?.url ??
        props.Image?.files?.[0]?.external?.url ??
        '',
    }
  })
})