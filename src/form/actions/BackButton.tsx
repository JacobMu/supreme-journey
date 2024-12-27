import { Button } from "react-admin";

interface Props {
	onClick(): void;
}

export const BackButton = ({ onClick }: Props) => (
	<Button onClick={onClick}>
		<span>Previous step</span>
	</Button>
);
