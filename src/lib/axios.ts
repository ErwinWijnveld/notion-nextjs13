import Axios from 'axios';

const token = process.env.NOTION_TOKEN || ''

const axios = Axios.create({
    baseURL: 'https://api.notion.com',
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
})

export default axios

export async function getPage(pageId:any) {
    try {
        const response = await axios.get(`/v3/load_page_chunk?page_id=${pageId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}


