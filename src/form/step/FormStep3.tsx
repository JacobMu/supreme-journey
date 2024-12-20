import { BooleanInput, RaRecord, required, SelectInput } from "react-admin";
import { FieldValues, useForm, UseFormSetValue } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { isRequired } from "../ValidationUtils.ts";
import { FORM_FIELD } from "../types.ts";

interface Props {
	getFieldProps: ReturnType<typeof useForm>["register"];

	onValueChange: UseFormSetValue<FieldValues>;
}

const SELECT_INPUT_CHOICE_MAP = {
	CATEGORIES: [
		{ id: "cat1", name: "Category 1" },
		{ id: "cat2", name: "Category 2" },
		{ id: "cat3", name: "Category 3" },
		{ id: "cat4", name: "Category 4" },
	],
	ANOTHER_CATEGORIES: [
		{ id: "cat1", name: "Category 1" },
		{ id: "cat2", name: "Category 2" },
		{
			id: "cat3",
			name: "Category 3",
		},
		{ id: "cat4", name: "Category 4" },
		{ id: "cat5", name: "Category 5" },
		{
			id: "cat6",
			name: "Category 6",
		},
		{ id: "cat7", name: "Category 7" },
		{ id: "cat8", name: "Category 8" },
		{
			id: "cat9",
			name: "Category 9",
		},
		{ id: "cat10", name: "Category 10" },
	],
};

export const FormStep3 = ({ getFieldProps, onValueChange }: Props) => {
	const [isChecked, setIsChecked] = useState(false);

	const getSelectChangeHandler =
		(fieldName: string) =>
		(event: ChangeEvent<HTMLInputElement> | RaRecord): void => {
			getFieldProps(fieldName).onChange({ target: event.target });
		};

	const handleSwitchClick = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.checked;
		setIsChecked(inputValue);
		onValueChange(FORM_FIELD.IS_ALLOWED, inputValue);
	};

	return (
		<>
			<SelectInput
				{...getFieldProps(FORM_FIELD.CATEGORY)}
				onChange={getSelectChangeHandler(FORM_FIELD.CATEGORY)}
				source={FORM_FIELD.CATEGORY}
				choices={SELECT_INPUT_CHOICE_MAP.CATEGORIES}
				validate={required()}
			/>
			<BooleanInput
				{...getFieldProps(FORM_FIELD.IS_ALLOWED)}
				defaultChecked={false}
				onChange={handleSwitchClick}
				source={FORM_FIELD.IS_ALLOWED}
			/>
			{isChecked && (
				<SelectInput
					{...getFieldProps(FORM_FIELD.ANOTHER_CATEGORY)}
					onChange={getSelectChangeHandler(FORM_FIELD.ANOTHER_CATEGORY)}
					choices={SELECT_INPUT_CHOICE_MAP.ANOTHER_CATEGORIES}
					source={FORM_FIELD.ANOTHER_CATEGORY}
					validate={[isRequired()]}
				/>
			)}
		</>
	);
};
