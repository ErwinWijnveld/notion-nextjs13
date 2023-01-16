import { getHomePage } from '@/lib/api/pages';
import { useEffect } from 'react';

const Test = async ({ page }: any) => {
	console.log(await getHomePage());
	return <div>Test</div>;
};
export default Test;
