import { FieldValues } from "react-hook-form";
import { FORM_FIELD, FORM_FIELDS } from "./types.ts";

const PASSWORD_DEFAULT = "The password needs to contain at least";

type ReturnValue = (value: string) => string | undefined;

export function passwordRequirements(): ReturnValue {
	return (value: string): string | undefined => {
		const hasNumber = new RegExp(/[0-9]+/).test(value);
		if (!hasNumber) {
			return `${PASSWORD_DEFAULT} one number`;
		}

		const hasCapital = new RegExp(/[A-Z]+/).test(value);
		if (!hasCapital) {
			return `${PASSWORD_DEFAULT} one capital letter`;
		}
		const hasEmptySpace = new RegExp(/\s+/).test(value);
		if (hasEmptySpace) {
			return "The password cannot contain empty space";
		}
		return undefined;
	};
}

type PasswordMatchingReturnValue = (
	value: string,
	form: FieldValues,
) => string | undefined;

export function passwordValuesMatching(
	message?: string,
): PasswordMatchingReturnValue {
	return (value: string, form: FieldValues): string | undefined => {
		if (value === form["password"]) {
			return undefined;
		}
		return message ?? "Password values are not matching.";
	};
}

export function isRequired(message?: string) {
	return (value: string, form: FieldValues): string | undefined => {
		if (form["agreement"] && !value) {
			return message ?? "Missing selected category value.";
		}
		return undefined;
	};
}

export function allowedCharacters(
	regexp: RegExp,
	message?: string,
): ReturnValue {
	return (value: string): string | undefined => {
		if (regexp.test(value)) {
			return (
				message ??
				"The input value contain characters other than alphabetical characters or empty space."
			);
		}
		return undefined;
	};
}

export function emptyInput(message?: string): ReturnValue {
	return (value: string): string | undefined => {
		if (!/[a-zA-Z]+/.test(value)) {
			return (
				message ?? "The input does not contain any alphabetical characters."
			);
		}
		return undefined;
	};
}

export function getMinMaxDates(): [Date, Date] {
	const minDate = new Date();
	const maxDate = structuredClone(minDate);
	maxDate.setFullYear(minDate.getFullYear() - 130);
	return [minDate, maxDate];
}

export function getMissingFields(form: FieldValues): FORM_FIELD[] {
	const errorSet = new Set<FORM_FIELD>();

	const set = FORM_FIELDS.reduce((set, field) => {
		if (!form[field]) {
			set.add(field);
		}
		return set;
	}, errorSet);

	if (form["isAllowed"] && !form["anotherCategory"]) {
		set.add(FORM_FIELD.ANOTHER_CATEGORY);
	}

	return Array.from(set);
}
