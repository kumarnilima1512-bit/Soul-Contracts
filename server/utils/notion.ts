import { Client } from '@notionhq/client'

let notion: Client | null = null

export function getNotionClient() {
  if (!notion) {
    const config = useRuntimeConfig()
    notion = new Client({ auth: config.notionToken })
  }
  return notion
}

// Cache the data source id so we don't fetch it on every request
let cachedDataSourceId: string | null = null

export async function getServicesDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId

  const config = useRuntimeConfig()
  const client = getNotionClient()

  const database = await client.databases.retrieve({
    database_id: config.notionServicesDatabaseId as string,
  })

  const dataSourceId = (database as any).data_sources?.[0]?.id

  if (!dataSourceId) {
    throw new Error('No data source found for this Notion database')
  }

  cachedDataSourceId = dataSourceId
  return dataSourceId
}