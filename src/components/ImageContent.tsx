import Image from 'next/image';
import { useEffect } from 'react';

const ImageContent = (page: any) => {
	return (
		<div>
			<div className="relative w-full h-[300px]">
				<Image
					src={page?.cover}
					alt="hero"
					fill
					className="object-cover"
				/>
			</div>
			<div className="container py-12 max-w-[700px]">
				{page?.content && (
					<div dangerouslySetInnerHTML={{ __html: page?.content }} />
				)}
			</div>
		</div>
	);
};
export default ImageContent;
