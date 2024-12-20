import { useNavigate } from "react-router";
import { FieldValues, useForm } from "react-hook-form";
import { getNavigationRoute } from "./NavigationUtils.ts";
import { BaseSyntheticEvent, useState } from "react";
import {
	DEFAULT_FORM_STORE,
	FORM_FIELD,
	LAST_STEP_ROUTE,
	ROUTE,
	STORE_KEY,
} from "./types.ts";
import { useStore } from "react-admin";
import { getMissingFields } from "./ValidationUtils.ts";

interface ReturnValue {
	register: ReturnType<typeof useForm>["register"];
	setValue: ReturnType<typeof useForm>["setValue"];
	missingFields: FORM_FIELD[];
	isLastStep: boolean;

	handleSubmitForm(data: FieldValues, e?: BaseSyntheticEvent): Promise<void>;

	handleBackClick(): void;
}

export const useFormPage = (step: ROUTE): ReturnValue => {
	const navigateTo = useNavigate();
	const [missingFields, setMissingFields] = useState<FORM_FIELD[]>([]);
	const { register, handleSubmit, setValue } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const [storeData, setStore] = useStore(STORE_KEY, DEFAULT_FORM_STORE);
	const navigationRoute = getNavigationRoute(step);
	const isLastStep = step === ROUTE.STEP_3;

	const handleUpdatingStore = (data: FieldValues) => {
		const updatedStoreDate = { ...storeData, ...data };
		setStore(updatedStoreDate);
		const missingFields = getMissingFields(updatedStoreDate);
		setMissingFields(missingFields);
	};

	const handleSuccessSubmit = () => {
		if (missingFields.length > 0) {
			return;
		}
		navigateTo(`/${LAST_STEP_ROUTE}`);
		setStore(DEFAULT_FORM_STORE);
	};

	const handleSuccessNextStep = (): void => {
		navigateTo(`/${navigationRoute.NEXT_ROUTE}`);
	};

	const handleNextStepClick = (
		data: FieldValues,
		e?: BaseSyntheticEvent,
	): Promise<void> => {
		handleUpdatingStore(data);
		return handleSubmit(handleSuccessNextStep)(e);
	};

	const handleSubmitForm = (
		data: FieldValues,
		e?: BaseSyntheticEvent,
	): Promise<void> => {
		handleUpdatingStore(data);
		return handleSubmit(handleSuccessSubmit)(e);
	};

	const handleBackClick = (): void => {
		navigateTo(`/${navigationRoute.BACK_ROUTE}`);
	};

	return {
		missingFields,
		register,
		setValue,
		isLastStep,
		handleSubmitForm: isLastStep ? handleSubmitForm : handleNextStepClick,
		handleBackClick,
	};
};
