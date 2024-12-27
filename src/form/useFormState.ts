import { useNavigate } from "react-router";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getNavigationRoute } from "./NavigationUtils.ts";
import { BaseSyntheticEvent } from "react";
import {
	DEFAULT_FORM_STORE,
	Form,
	LAST_STEP_ROUTE,
	ROUTE,
	FORM_DATA_KEY,
	FORM_ERROR_KEY,
} from "./types.ts";
import { useStore } from "react-admin";
import { ObjectSchema } from "yup";

interface ReturnValue {
	control: ReturnType<typeof useForm>["control"];
	formFieldMap: Form;
	formError: FieldErrors | undefined;

	handleSubmitEntireForm(
		data: FieldValues,
		e?: BaseSyntheticEvent,
	): Promise<void>;

	handleSubmitFormStep(
		data: FieldValues,
		e?: BaseSyntheticEvent,
	): Promise<void>;

	handleBackClick(): void;
}

interface HookParam {
	step: ROUTE;
	schema: ObjectSchema<FieldValues>;
	defaultFormValue: Form;
}

export const useFormState = ({
	step,
	defaultFormValue,
	schema,
}: HookParam): ReturnValue => {
	const navigateTo = useNavigate();
	const [formData, setFormData] = useStore<Form>(FORM_DATA_KEY);
	const [formError, setFormError] = useStore<FieldErrors | undefined>(
		FORM_ERROR_KEY,
	);

	const { handleSubmit, control, getValues } = useForm({
		mode: "onSubmit",
		reValidateMode: "onChange",
		values: formData,
		defaultValues: defaultFormValue,
		resolver: yupResolver(schema),
	});
	const navigationRoute = getNavigationRoute(step);

	const handleSuccessSubmit = () => {
		navigateTo(`/${LAST_STEP_ROUTE}`);
		setFormData(DEFAULT_FORM_STORE);
		setFormError(undefined);
	};

	const handleSuccessNextStep = (data: FieldValues): void => {
		setFormData((prevData) => ({ ...prevData, ...data }));
		setFormError(undefined);
		navigateTo(`/${navigationRoute.NEXT_ROUTE}`);
	};

	const handleSubmitFormStep = (
		__data: FieldValues,
		e?: BaseSyntheticEvent,
	) => {
		e?.preventDefault();
		return handleSubmit(() => handleSuccessNextStep(getValues()))(e);
	};

	const handleErrorSubmit = (errors: FieldErrors): void => {
		setFormError(errors);
	};

	const handleSubmitEntireForm = (
		__data: FieldValues,
		e?: BaseSyntheticEvent,
	): Promise<void> => {
		e?.preventDefault();
		return handleSubmit(handleSuccessSubmit, handleErrorSubmit)(e);
	};

	const handleBackClick = (): void => {
		navigateTo(`/${navigationRoute.BACK_ROUTE}`);
	};

	return {
		control,
		formError,
		formFieldMap: getValues() as Form,
		handleSubmitEntireForm,
		handleSubmitFormStep,
		handleBackClick,
	};
};
