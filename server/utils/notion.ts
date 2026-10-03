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

export function getRichText(richText: any[] = []): string {
  return richText
    .map((item) => item.plain_text ?? item.text?.content ?? '')
    .join('')
    .trim()
}

export async function getPageContent(pageId: string): Promise<string[]> {
  const notion = getNotionClient()
  const blocks: string[] = []

  const fetchBlocks = async (blockId: string) => {
    let cursor: string | undefined = undefined

    do {
      const blockResponse = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
      })

      for (const block of blockResponse.results as any[]) {
        if (block.type && block[block.type]?.rich_text) {
          const text = getRichText(block[block.type].rich_text)
          if (text) blocks.push(text)
        }

        if (block.has_children) {
          await fetchBlocks(block.id)
        }
      }

      cursor = blockResponse.has_more ? (blockResponse.next_cursor ?? undefined) : undefined
    } while (cursor)
  }

  await fetchBlocks(pageId)
  return blocks
}