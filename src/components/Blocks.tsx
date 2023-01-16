import HeroBig from './HeroBig/HeroBig';

const Blocks = ({ page }: any) => {
	const { blocks } = page;
	let partials = [] as any;

	blocks?.map((block: any, index: number) => {
		switch (block?.type) {
			case 'hero-big':
				partials.push(
					<HeroBig block={block.children.children} key={index} />
				);
				break;
			default:
				return <div>No fields</div>;
		}
	});

	return <>{partials.map((partial: any) => partial)}</>;
};
export default Blocks;
