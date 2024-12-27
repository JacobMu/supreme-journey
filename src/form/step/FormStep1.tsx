import { DateInput, TextInput } from "react-admin";
import { PERSONAL_INFORMATION_SCHEMA } from "../ValidationUtils.ts";
import { DEFAULT_FORM_STORE, FORM_FIELD, ROUTE } from "../types.ts";
import { Form } from "../Form.tsx";
import { useFormState } from "../useFormState.ts";
import { BackButton } from "../actions/BackButton.tsx";
import { NextButton } from "../actions/NextButton.tsx";

export const FormStep1 = () => {
	const { handleBackClick, handleSubmitFormStep, control } = useFormState({
		step: ROUTE.STEP_1,
		schema: PERSONAL_INFORMATION_SCHEMA,
		defaultFormValue: DEFAULT_FORM_STORE,
	});

	return (
		<Form onSubmit={handleSubmitFormStep}>
			<TextInput
				control={control}
				source={FORM_FIELD.FIRST_NAME}
				name={FORM_FIELD.FIRST_NAME}
			/>
			<TextInput
				control={control}
				name={FORM_FIELD.LAST_NAME}
				source={FORM_FIELD.LAST_NAME}
			/>
			<DateInput
				control={control}
				name={FORM_FIELD.BIRTH_DAY}
				source={FORM_FIELD.BIRTH_DAY}
			/>
			<div>
				<BackButton onClick={handleBackClick} />
				<NextButton />
			</div>
		</Form>
	);
};
