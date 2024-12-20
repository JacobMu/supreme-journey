import { ROUTE } from "./types.ts";
import { FormStep1 } from "./step/FormStep1.tsx";
import { FormStep2 } from "./step/FormStep2.tsx";
import { Form } from "./Form.tsx";
import { Button } from "react-admin";
import { FormStep3 } from "./step/FormStep3.tsx";
import { useFormPage } from "./useFormPage.ts";

interface Props {
	step: ROUTE;
	nextStep?: ROUTE;
}

export const FormPage = ({ step }: Props) => {
	const {
		handleBackClick,
		isLastStep,
		handleSubmitForm,
		register,
		setValue,
		missingFields,
	} = useFormPage(step);

	const missingField = missingFields.length > 0 && (
		<div>
			There are empty form field(s):
			<ul>
				{missingFields.map((field) => (
					<li>{field}</li>
				))}
			</ul>
		</div>
	);

	return (
		<Form onSubmit={handleSubmitForm}>
			{ROUTE.STEP_1 === step && <FormStep1 getFieldProps={register} />}
			{ROUTE.STEP_2 === step && <FormStep2 getFieldProps={register} />}
			{ROUTE.STEP_3 === step && (
				<>
					<FormStep3 getFieldProps={register} onValueChange={setValue} />
					{missingField}
				</>
			)}
			<Button onClick={handleBackClick}>
				<span>Previous step</span>
			</Button>
			{isLastStep && (
				<Button type="submit">
					<span>Submit form</span>
				</Button>
			)}
			{!isLastStep && (
				<Button type="submit">
					<span>Next step</span>
				</Button>
			)}
		</Form>
	);
};
