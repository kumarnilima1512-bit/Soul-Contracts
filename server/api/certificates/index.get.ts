import { getNotionClient, getDataSourceId } from '../../utils/notion'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const notion = getNotionClient()
  const dataSourceId = await getDataSourceId(config.notionCertificatesDatabaseId as string)

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
  })

  return response.results.map((page: any) => {
    const props = page.properties
    return {
      title: props.Name?.title?.[0]?.plain_text ?? '',
      organization: props.Organization?.rich_text?.[0]?.plain_text ?? '',
      year: props.Year?.rich_text?.[0]?.plain_text ?? '',
      image:
        props.Image?.files?.[0]?.file?.url ??
        props.Image?.files?.[0]?.external?.url ??
        '',
    }
  })
})