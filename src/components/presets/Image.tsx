import NextImage from 'next/image';

type ImageProps = {
	image?: {
		url: string | any;
		type: string;
	};
	alt: string;
	[key: string]: any;
};

const Image = (props: ImageProps) => {
	const { image, ...rest } = props;

	const isBlur = rest?.placeholder === 'blur';

	const newProps = {
		...rest,
		src: image?.url,
		quality: image?.type === 'external' ? 25 : 75,
		blurDataURL: isBlur ? image?.url : undefined,
	};

	return <NextImage {...newProps} />;
};

export default Image;
