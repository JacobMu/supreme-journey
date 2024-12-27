import { ROUTE, FORM_DATA_KEY, FORM_ERROR_KEY, Form } from "./types.ts";
import { FormStep1 } from "./step/FormStep1.tsx";
import { FormStep2 } from "./step/FormStep2.tsx";
import { ReviewStep } from "./step/ReviewStep.tsx";
import { useStore } from "react-admin";
import { FieldErrors } from "react-hook-form";

interface Props {
	step: ROUTE;
	nextStep?: ROUTE;
}

export const FormPage = ({ step }: Props) => {
	useStore<Form>(FORM_DATA_KEY);
	useStore<FieldErrors>(FORM_ERROR_KEY);

	return (
		<>
			{ROUTE.STEP_1 === step && <FormStep1 />}
			{ROUTE.STEP_2 === step && <FormStep2 />}
			{ROUTE.STEP_3 === step && <ReviewStep />}
		</>
	);
};
