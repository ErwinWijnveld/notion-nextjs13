import { getImage, notionClient } from "../notion";
import { pageFormatted } from "./pages";

const blocksDatabaseId = process.env.NOTION_BLOCKS_DATABASE_ID || '';

export async function getBlocks(blocks:any) {
    if(!blocks) return null

    const blockChildren = await Promise.all(blocks.map(async (block:any) => {

        // get block children (child pages)
        const children = await getRecursiveChildPages(block)

        // get block page data
        const page = await notionClient.pages.retrieve({ page_id: block.id }) as any

        return {
            type: page?.properties?.Type?.select?.name,
            children: children
        }
    }))

    return blockChildren

    async function getRecursiveChildPages(parentBlock:any) {

        // list of child blocks without data
        const children = await notionClient.blocks.children.list({
            block_id: parentBlock.id,
        })

        // filter child blocks to only get child pages
        const childPages = children.results.filter((child:any) => child.type === 'child_page')

        const childPagesWithChildren = await Promise.all(childPages.map(async (childPage:any) => {
            return await getRecursiveChildPages(childPage)
        })) as any

        // return all other child blocks
        const childBlocks = formatBlocks(children?.results.filter((child:any) => child.type !== 'child_page'))

        return {
            fields: childBlocks?.length > 0 ? childBlocks : null,
            children: childPagesWithChildren?.length > 0 ? childPagesWithChildren : null
        }

    }

    function formatBlocks(blocks:any) {
        return blocks?.map((child:any) => {
            if(child.type === 'image') {
                return {
                    type: child.type,
                    [child.type]: getImage(child[child.type])
                }
            }
            return {
                type: child.type,
                [child.type]: child[child.type]
            }
        })
    }
}



