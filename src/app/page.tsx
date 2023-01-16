import { Page } from '@/@types/pages';
import Blocks from '@/components/Blocks';
import ImageContent from '@/components/ImageContent';
import Layout from '@/components/Layout';
import Test from '@/components/Test';
import { getHomePage } from '@/lib/api/pages';
import Image from 'next/image';

const getData = async () => {
	const homepage = (await getHomePage()) as Page;
	return homepage;
};

export default async function Home() {
	const page = await getData();

	return (
		<Layout page={page}>
			<Blocks page={page} />
			{/* <Test page={page} /> */}
		</Layout>
	);
}
