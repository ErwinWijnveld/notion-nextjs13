'use client';

import { COLORS } from '@/lib/consts';
import { generateHTML, getImage, getLink } from '@/lib/notion';
import Button from '../buttons/Button';
import ImageButton from './ImageButton';

const HeroBig = ({ block }: any) => {
	// const text = getHTML()
	console.log('block', block);
	return (
		<section className="realtive ">
			<div className="absolute top-[25%] -left-[35px] w-[95px] aspect-square bg-darkBlue rounded-full" />
			<div className="absolute top-[12%] left-[10%] w-[38px] aspect-square bg-lightBlue rounded-full" />
			<div className="flex justify-between h-screen min-h-[680px] max-h-[820px] max-w-[1384px] mx-auto px-12">
				<div className="w-[27%] shrink-0 flex items-end">
					<ImageButton
						image={block[0]?.fields[0]?.image}
						link={getLink(block[1])}
						style={{
							backgroundColor: COLORS.lightBlue,
						}}
						reverse
					/>
				</div>
				{block[4] && (
					<div className="w-4/12 flex items-center flex-col justify-center">
						<div
							className="text-center [&>h1]:mb-6 mb-4"
							dangerouslySetInnerHTML={{
								__html: generateHTML(block[4]),
							}}
						/>
						{getLink(block[5])?.url && (
							<Button
								className="bg-mainSand text-white"
								href={getLink(block[5])?.url}
							>
								{getLink(block[5])?.title}
							</Button>
						)}
					</div>
				)}
				<div className="w-[27%] shrink-0">
					<ImageButton
						image={block[2]?.fields[0]?.image}
						link={getLink(block[3])}
						style={{
							backgroundColor: COLORS.mediumBlue,
						}}
					/>
				</div>
			</div>
		</section>
	);
};
export default HeroBig;
