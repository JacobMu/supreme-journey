import { Button, useStore } from "react-admin";
import { useNavigate } from "react-router";
import { FORM_ERROR_KEY, ROUTE } from "./types.ts";

export const EntryButton = () => {
	const navigate = useNavigate();
	const [, setStore] = useStore(FORM_ERROR_KEY);

	const handleClick = () => {
		setStore(undefined);
		navigate(`/${ROUTE.STEP_1}`);
	};
	return (
		<Button onClick={handleClick}>
			<span>Go to form</span>
		</Button>
	);
};
