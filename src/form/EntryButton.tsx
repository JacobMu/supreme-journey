import { Button } from "react-admin";
import { useNavigate } from "react-router";
import { ROUTE } from "./types.ts";

export const EntryButton = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/${ROUTE.STEP_1}`);
	};
	return (
		<Button onClick={handleClick}>
			<span>Go to form</span>
		</Button>
	);
};
