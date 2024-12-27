export enum ROUTE {
	STEP_1 = "step-1",
	STEP_2 = "step-2",
	STEP_3 = "step-3",
}

export const LAST_STEP_ROUTE = "final";

export interface PersonalInfo {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
}

export interface Credential {
	email: string;
	password: string;
	retypedPassword: string;
	role: string;
}

export interface Form extends PersonalInfo, Credential {}

export enum FORM_FIELD {
	FIRST_NAME = "firstName",
	LAST_NAME = "lastName",
	BIRTH_DAY = "dateOfBirth",
	EMAIL = "email",
	PASSWORD = "password",
	RETYPED_PASSWORD = "retypedPassword",
	ROLE = "role",
}

export const FORM_DATA_KEY = "form-data";
export const FORM_ERROR_KEY = "form-error";

export const ROLES = [
	{ id: "wizard", name: "Wizard" },
	{ id: "mage", name: "Mage" },
	{ id: "witch", name: "Witch" },
	{ id: "babaYaga", name: "Baba Yaga" },
];

export const DEFAULT_FORM_STORE: Form = {
	[FORM_FIELD.FIRST_NAME]: "",
	[FORM_FIELD.LAST_NAME]: "",
	[FORM_FIELD.BIRTH_DAY]: "",
	[FORM_FIELD.EMAIL]: "",
	[FORM_FIELD.PASSWORD]: "",
	[FORM_FIELD.RETYPED_PASSWORD]: "",
	[FORM_FIELD.ROLE]: "",
};
