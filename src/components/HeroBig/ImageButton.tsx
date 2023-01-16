import Image from '../presets/Image';
import Link from '../presets/Link';

const ImageButton = ({ image, link, reverse, ...rest }: any) => {
	const reverseContainer = reverse
		? 'flex-col rounded-full translate-y-[25%]'
		: 'flex-col-reverse -translate-y-[10%] rounded-b-full';
	const reverseLink = reverse ? 'pb-12 pt-20' : 'pt-12 pb-20';
	const reverseImage = reverse ? 'rounded-full' : 'rounded-b-full';
	return (
		<>
			{link?.url && (
				<Link
					href={link.url}
					{...rest}
					className={'aspect-[.5] w-full flex ' + reverseContainer}
				>
					<div
						className={
							'px-2 text-white gap-4 flex items-center justify-center flex-col text-2xl font-bold uppercase ' +
							reverseLink
						}
					>
						{link?.title}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12.592"
							height="12.592"
							viewBox="0 0 12.592 12.592"
						>
							<path
								id="Icon_ionic-md-arrow-down"
								data-name="Icon ionic-md-arrow-down"
								d="M13.059,5.977v9.562l4.407-4.407,1.1,1.141-6.3,6.3-6.3-6.3,1.1-1.1,4.407,4.368V5.977Z"
								transform="translate(-5.977 -5.977)"
								fill="#fff"
							/>
						</svg>
					</div>
					{image?.url && (
						<div
							className={
								'relative w-full flex-1  overflow-hidden ' +
								reverseImage
							}
						>
							<Image
								image={image}
								alt="sfeerbeeld"
								fill
								placeholder="blur"
								className="object-cover"
							/>
						</div>
					)}
				</Link>
			)}
		</>
	);
};
export default ImageButton;
