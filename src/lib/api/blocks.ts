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

        const test = await recursiveFormatFields(children?.results)

        return {
            type: page?.properties?.Type?.select?.name,
            test: test,
            children: test,
            // children: children?.results
        }
    }))

    return blockChildren
}

export async function recursiveFormatFields(blocks:any) {
    if(!blocks) return null
    const formattedBlocks = Promise.all(blocks.map(async (block:any) => {
        if(block?.[block?.type].is_toggleable && block?.has_children) {
            const children = await getBlockChildren(block)

            const formattedBlocks = await formatBlocks(children.results)
            return {fields: formattedBlocks}
        }
    }))

    return formattedBlocks
}

async function formatBlocks(blocks:any) {
    return await Promise.all(blocks?.map(async (child:any) => {
        if(child?.[child.type]?.is_toggleable) {
            const children = await getBlockChildren(child)
            const formattedBlocks = await formatBlocks(children.results)
            return {
                type: child.type,
                [child.type]: child[child.type],
                fields: formattedBlocks
            }
        }

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
    }))
}

async function getBlockChildren(block:any) {
    const children = await notionClient.blocks.children.list({
        block_id: block.id,
    })

    return children
}