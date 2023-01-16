import { getImage, notionClient } from "../notion";
import { pageFormatted } from "./pages";

const blocksDatabaseId = process.env.NOTION_BLOCKS_DATABASE_ID || '';

export async function getBlocks(blocks:any) {
    if(!blocks) return null

    const blockChildren = await Promise.all(blocks.map(async (block:any) => {
        // get block children
        const children = await notionClient.blocks.children.list({
            block_id: block.id,
        })

        // get block page data
        const page = await notionClient.pages.retrieve({ page_id: block.id }) as any

        return {
            type: page?.properties?.Type?.select?.name,
            children: children?.results
        }
    }))

    return blockChildren
}

export async function recursiveFormatFields(blocks:any) {
    if(!blocks) return null
    const formattedBlocks = blocks.map((block:any) => {
        if(block?.[block?.type].is_toggleable && block?.has_children) {
           return {
                
           }
        }
    })
   
}



