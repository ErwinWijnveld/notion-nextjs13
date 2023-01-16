import Link from '../presets/Link';

const Button = ({ className, children, ...rest }: any) => {
	return (
		<Link
			{...rest}
			className={
				'rounded-full px-16 py-3 font-bold text-center uppercase text-sm ' +
				className
			}
		>
			{children}
		</Link>
	);
};
export default Button;
