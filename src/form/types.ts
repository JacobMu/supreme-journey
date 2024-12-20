export enum ROUTE {
	STEP_1 = "step-1",
	STEP_2 = "step-2",
	STEP_3 = "step-3",
}

export const LAST_STEP_ROUTE = "final";

export enum FORM_FIELD {
	FIRST_NAME = "firstName",
	LAST_NAME = "lastName",
	BIRTH_DAY = "dateOfBirth",
	EMAIL = "email",
	PASSWORD = "password",
	RETYPED_PASSWORD = "retypedPassword",
	CATEGORY = "category",
	IS_ALLOWED = "isAllowed",
	ANOTHER_CATEGORY = "anotherCategory",
}

export const STORE_KEY = "form-store";

export const FORM_FIELDS: FORM_FIELD[] = [
	FORM_FIELD.FIRST_NAME,
	FORM_FIELD.LAST_NAME,
	FORM_FIELD.BIRTH_DAY,
	FORM_FIELD.EMAIL,
	FORM_FIELD.PASSWORD,
	FORM_FIELD.RETYPED_PASSWORD,
];

export const DEFAULT_FORM_STORE = {
	[FORM_FIELD.FIRST_NAME]: undefined,
	[FORM_FIELD.LAST_NAME]: undefined,
	[FORM_FIELD.BIRTH_DAY]: undefined,
	[FORM_FIELD.EMAIL]: undefined,
	[FORM_FIELD.PASSWORD]: undefined,
	[FORM_FIELD.RETYPED_PASSWORD]: undefined,
	[FORM_FIELD.CATEGORY]: undefined,
	[FORM_FIELD.IS_ALLOWED]: false,
	[FORM_FIELD.ANOTHER_CATEGORY]: undefined,
};
