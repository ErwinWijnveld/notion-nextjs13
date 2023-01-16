import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export const notionClient = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const n2m = new NotionToMarkdown({ notionClient: notionClient });

export const getImage = (image:any) => {
    switch (image?.type) {
        case 'file':
            return {url: image.file.url, type: image?.type}
        case 'external':
            return {url: image.external.url, type: image?.type};
        default:
            return null
    }
}

export const getLink = (block:any) => {
    if(!block?.fields[0]?.[block?.fields[0]?.type]?.rich_text[0]?.text?.link) return null
    return {
        title: block?.fields[0]?.[block?.fields[0]?.type]?.rich_text[0]?.text?.content,
        url: block?.fields[0]?.[block?.fields[0]?.type]?.rich_text[0]?.text?.link?.url
    }
}


export const getRichText = (block: any) => {
    if (block?.[block?.type]) {
        let richText = '';
        block[block.type].rich_text.forEach((text: any) => {
            if (text.annotations) {
                if (text.annotations.bold) {
                    richText += `<strong>${text.text.content}</strong>`;
                } 
                if (text.annotations.italic) {
                    richText += `<em>${text.text.content}</em>`;
                } 
                if (text.annotations.underline) {
                    richText += `<u>${text.text.content}</u>`;
                } 
                if (text.annotations.strikethrough) {
                    richText += `<strike>${text.text.content}</strike>`;
                } 
                if (text.annotations.code) {
                    richText += `<code>${text.text.content}</code>`;
                } 
                if (text.text?.link?.url) {
                    richText += `<a href='${text.text?.link?.url}'>${text.text.content}</a>`;
                } 
                else {
                    richText += text.text.content;
                }
            } else {
                richText += text.plain_text;
            }
        });
        return richText;
    }
    return '';
}

export const generateHTML = (block:any) => {
    const { fields } = block

    const formattedFields = fields?.map((field:any) => {
        switch (field.type) {
            case 'heading_1':
                return formatHeading(field)
            case 'heading_2':
                return formatHeading(field)
            case 'heading_3':
                return formatHeading(field)
            case 'paragraph':
                return formatParagraph(field)
            // case 'image':
            //     return formatImage(field)
            // case 'bulleted_list_item':
            //     return formatBulletedListItem(field)
            // case 'numbered_list_item':
            //     return formatNumberedListItem(field)
            // case 'toggle':
            //     return formatToggle(field)
            // case 'quote':
            //     return formatQuote(field)
            // case 'divider':
            //     return formatDivider(field)
            // case 'callout':
            //     return formatCallout(field)
            // case 'equation':
            //     return formatEquation(field)
            // case 'code':
            //     return formatCode(field)
            // default :
            //     return null

        }
    })

        const html = formattedFields?.join('')
        
        
        return html

    // return block
}

export const formatHeading = (field:any) => {
    const { type } = field;
    const headingType = type.split("_")[1]; // get the heading level from the type
    const text = getRichText(field);
    return `<h${headingType}>${text}</h${headingType}>`;
}

export const formatParagraph = (field:any) => {
    const text = getRichText(field);
    return `<p>${text}</p>`;
}

// const pageMd = await n2m.pageToMarkdown(id)
// const markdownString = n2m.toMarkdownString(pageMd)
// const htmlString = marked.parse(markdownString);