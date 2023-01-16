import { getPage } from '@/lib/axios';
import { useEffect } from 'react';

const Test = async ({ page }: any) => {
	console.log(await getPage('50ef0039fc2e4797aeaf21cc60161a01'));
	return <div>Test</div>;
};
export default Test;
