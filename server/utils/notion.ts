import { Client } from '@notionhq/client'

let notion: Client | null = null

export function getNotionClient() {
  if (!notion) {
    const config = useRuntimeConfig()
    notion = new Client({ auth: config.notionToken })
  }
  return notion
}

const dataSourceCache = new Map<string, string>()

export async function getDataSourceId(databaseId: string): Promise<string> {
  if (dataSourceCache.has(databaseId)) {
    return dataSourceCache.get(databaseId) as string
  }

  const client = getNotionClient()
  const database = await client.databases.retrieve({ database_id: databaseId })
  const dataSourceId = (database as any).data_sources?.[0]?.id

  if (!dataSourceId) {
    throw new Error(`No data source found for database ${databaseId}`)
  }

  dataSourceCache.set(databaseId, dataSourceId)
  return dataSourceId
}