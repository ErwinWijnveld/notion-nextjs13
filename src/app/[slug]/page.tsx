import { Page } from '@/@types/pages';
import ImageContent from '@/components/ImageContent';
import { getPages, getSinglePage } from '@/lib/api/pages';

const getData = async (slug: string) => {
	const homepage = (await getSinglePage(slug)) as Page;
	return homepage;
};

export async function generateStaticParams() {
	const pages = (await getPages()) as Array<Page>;

	return pages.map((page: Page) => ({
		slug: page.slug,
	}));
}

const page = async ({ params: { slug } }: any) => {
	const page = await getData(slug);
	return <ImageContent {...page} />;
};
export default page;
