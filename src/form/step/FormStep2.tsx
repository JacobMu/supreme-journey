import {
	email,
	minLength,
	PasswordInput,
	required,
	TextInput,
} from "react-admin";
import {
	passwordRequirements,
	passwordValuesMatching,
} from "../ValidationUtils.ts";
import { useForm } from "react-hook-form";
import { FORM_FIELD } from "../types.ts";

interface Props {
	getFieldProps: ReturnType<typeof useForm>["register"];
}

export const FormStep2 = ({ getFieldProps }: Props) => {
	return (
		<>
			<TextInput
				{...getFieldProps(FORM_FIELD.EMAIL)}
				source={FORM_FIELD.EMAIL}
				validate={[required(), email()]}
			/>
			<PasswordInput
				{...getFieldProps(FORM_FIELD.PASSWORD)}
				source={FORM_FIELD.PASSWORD}
				validate={[required(), minLength(8), passwordRequirements()]}
			/>
			<PasswordInput
				{...getFieldProps(FORM_FIELD.RETYPED_PASSWORD)}
				label="Type the password again"
				source={FORM_FIELD.RETYPED_PASSWORD}
				validate={[required(), minLength(8), passwordValuesMatching()]}
			/>
		</>
	);
};
