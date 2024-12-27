import { PasswordInput, SelectInput, TextInput } from "react-admin";
import { CREDENTIAL_SCHEMA } from "../ValidationUtils.ts";
import { DEFAULT_FORM_STORE, FORM_FIELD, ROLES, ROUTE } from "../types.ts";
import { useFormState } from "../useFormState.ts";
import { Form } from "../Form.tsx";
import { BackButton } from "../actions/BackButton.tsx";
import { NextButton } from "../actions/NextButton.tsx";

export const FormStep2 = () => {
	const { handleBackClick, handleSubmitFormStep, control } = useFormState({
		step: ROUTE.STEP_2,
		schema: CREDENTIAL_SCHEMA,
		defaultFormValue: DEFAULT_FORM_STORE,
	});

	return (
		<Form onSubmit={handleSubmitFormStep}>
			<TextInput
				control={control}
				name={FORM_FIELD.EMAIL}
				source={FORM_FIELD.EMAIL}
			/>
			<PasswordInput
				control={control}
				name={FORM_FIELD.PASSWORD}
				source={FORM_FIELD.PASSWORD}
			/>
			<PasswordInput
				control={control}
				label="Type the password again"
				name={FORM_FIELD.RETYPED_PASSWORD}
				source={FORM_FIELD.RETYPED_PASSWORD}
			/>
			<SelectInput
				source={FORM_FIELD.ROLE}
				label="Select your role"
				control={control}
				name={FORM_FIELD.ROLE}
				choices={ROLES}
			/>
			<div>
				<BackButton onClick={handleBackClick} />
				<NextButton />
			</div>
		</Form>
	);
};
