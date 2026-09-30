import { getNotionClient, getDataSourceId } from '../../utils/notion'

export default defineEventHandler(async (event) => {
  const role = getRouterParam(event, 'role')

  if (!role) {
    throw createError({ statusCode: 400, statusMessage: 'Missing profile role' })
  }

  const config = useRuntimeConfig()
  const notion = getNotionClient()
  const dataSourceId = await getDataSourceId(config.notionProfilesDatabaseId as string)

  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: 'Role',
      select: { equals: role },
    },
  })

  const page = response.results[0] as any

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Profile not found' })
  }

  const props = page.properties

  return {
    name: props.Name?.title?.[0]?.plain_text ?? '',
    role: props.Role?.select?.name ?? '',
    tagline: props.Tagline?.rich_text?.[0]?.plain_text ?? '',
    bio: props.Bio?.rich_text?.[0]?.plain_text ?? '',
    yearsExperience: props.YearsExperience?.number ?? null,
    works: (props.Works?.rich_text?.[0]?.plain_text ?? '')
      .split('\n')
      .map((s: string) => s.trim())
      .filter(Boolean),
    image:
      props.ProfileImage?.files?.[0]?.file?.url ??
      props.ProfileImage?.files?.[0]?.external?.url ??
      '',
  }
})