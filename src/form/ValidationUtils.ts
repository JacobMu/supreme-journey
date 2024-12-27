import { FORM_FIELD } from "./types.ts";
import * as yup from "yup";

export const EMPTY_SPACE_STRING_REGEXP = /[^\s+$]/;

export const PERSONAL_INFORMATION_SCHEMA = yup.object({
	[FORM_FIELD.FIRST_NAME]: yup
		.string()
		.required()
		.matches(
			EMPTY_SPACE_STRING_REGEXP,
			"The input cannot contain only empty spaces.",
		),
	[FORM_FIELD.LAST_NAME]: yup
		.string()
		.required()
		.matches(
			EMPTY_SPACE_STRING_REGEXP,
			"The input cannot contain only empty spaces.",
		),
	[FORM_FIELD.BIRTH_DAY]: yup
		.string()
		.required()
		.test({
			name: "min-date",
			message: "You must be at least 18 years old.",
			test: (value) => {
				const minDate = new Date();
				minDate.setFullYear(minDate.getFullYear() - 18);
				return new Date(value) <= minDate;
			},
		}),
});

export const CREDENTIAL_SCHEMA = yup.object({
	[FORM_FIELD.EMAIL]: yup.string().email().required(),
	[FORM_FIELD.PASSWORD]: yup
		.string()
		.min(10)
		.matches(
			new RegExp(/[A-Z]+/),
			`The password needs to contain at least one capital letter.`,
		)
		.matches(
			new RegExp(/[0-9]+/),
			`The password needs to contain at least one number.`,
		)
		.matches(new RegExp(/[^\s+]/), "The password cannot contain empty space.")
		.required(),
	[FORM_FIELD.RETYPED_PASSWORD]: yup
		.string()
		.required()
		.test({
			name: "matching-password",
			message: "The passwords are not matching.",
			test: (value, context) => value === context.parent[FORM_FIELD.PASSWORD],
		}),
});

export const FORM_SCHEMA =
	PERSONAL_INFORMATION_SCHEMA.concat(CREDENTIAL_SCHEMA);
