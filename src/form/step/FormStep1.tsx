import {
	DateInput,
	maxValue,
	minValue,
	required,
	TextInput,
} from "react-admin";
import { useForm } from "react-hook-form";
import {
	allowedCharacters,
	emptyInput,
	getMinMaxDates,
} from "../ValidationUtils.ts";
import { FORM_FIELD } from "../types.ts";

interface Props {
	getFieldProps: ReturnType<typeof useForm>["register"];
}

export const FormStep1 = ({ getFieldProps }: Props) => {
	const [minDate, maxDate] = getMinMaxDates();

	return (
		<>
			<TextInput
				{...getFieldProps(FORM_FIELD.FIRST_NAME)}
				source={FORM_FIELD.FIRST_NAME}
				validate={[required(), emptyInput(), allowedCharacters(/[^a-zA-Z\s]+/)]}
			/>
			<TextInput
				{...getFieldProps(FORM_FIELD.LAST_NAME)}
				source={FORM_FIELD.LAST_NAME}
				validate={[required(), emptyInput(), allowedCharacters(/[^a-zA-Z\s]+/)]}
			/>
			<DateInput
				{...getFieldProps(FORM_FIELD.BIRTH_DAY)}
				source={FORM_FIELD.BIRTH_DAY}
				validate={[
					required(),
					maxValue(minDate.toJSON(), "The birth date cannot be in the future."),
					minValue(
						maxDate.toJSON(),
						"The birth date seems to be too far in the past.",
					),
				]}
			/>
		</>
	);
};
