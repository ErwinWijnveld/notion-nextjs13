import { getImage, notionClient } from "../notion";
import { getBlocks } from "./blocks";

const pagesDatabaseId = process.env.NOTION_PAGES_DATABASE_ID || '';

const isPublished = {
    property: 'Status',
    select: {
        equals: 'Published'
    }
}
const isHomePage = {
    property: 'Homepage',
    checkbox: {
        equals: true
    }
}

const isNotHomePage = {
    property: 'Homepage',
    checkbox: {
        equals: false
    }
}
export const getPages = async () => {
    const pages = await notionClient.databases.query({
        database_id: pagesDatabaseId,
        filter: {
            and: [
                isNotHomePage,
                isPublished
            ]
        }
    });

    const formattedPages = pages.results[0] ? await Promise.all(pages.results.map(async (page:any) => {
        return await pageFormatted(page)
    })) : '';

    return formattedPages
}

export const getHomePage = async () => {
    const pages = await notionClient.databases.query({
        database_id: pagesDatabaseId,
        filter: {
            and: [
                isHomePage,
                isPublished
            ]
        }
    });

    return pages.results[0] ? await pageFormatted(pages.results[0]) : '';
}

export const getSinglePage = async (slug:string) => {
    const pages = await notionClient.databases.query({
        database_id: pagesDatabaseId,
        filter: {
            and: [
                {
                    property: 'Slug',
                    formula: {
                        string: {
                            equals: slug
                        }
                    },
                },
                isPublished
            ]
        }
    });

    return pages.results[0] ? await pageFormatted(pages.results[0]) : '';
}
export const pageFormatted = async (page:any) => {
    const { id, properties, cover } = page;


    // get blocks
    const blocks = page?.properties?.Blocks?.relation[0] ? await getBlocks(page?.properties?.Blocks?.relation) : null
    
    // get children
    const children = await notionClient.blocks.children.list({
        block_id: id,
    })

    // return the formatted page
    return {
        // properties,
        cover: getImage(cover),
        content: children?.results,
        slug: properties?.Slug?.formula?.string || null,
        blocks: blocks
    }
}