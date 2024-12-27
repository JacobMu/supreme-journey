import { DEFAULT_FORM_STORE, FORM_FIELD, ROUTE } from "../types.ts";
import styled from "@emotion/styled";
import { useFormState } from "../useFormState.ts";
import { FORM_SCHEMA } from "../ValidationUtils.ts";
import { BackButton } from "../actions/BackButton.tsx";
import { Button } from "react-admin";
import { Form } from "../Form.tsx";
import { getMaskedInput } from "./ReviewUtils.ts";

const Field = styled.li<{ isOdd: boolean }>`
	background-color: ${(props) => (props.isOdd ? "#6b6b6b;" : "#313131")};
	padding: 5px 10px;
	list-style-type: none;
`;

export const ReviewStep = () => {
	const { handleBackClick, handleSubmitEntireForm, formFieldMap, formError } =
		useFormState({
			step: ROUTE.STEP_3,
			schema: FORM_SCHEMA,
			defaultFormValue: DEFAULT_FORM_STORE,
		});
	let i = 0;

	return (
		<Form onSubmit={handleSubmitEntireForm}>
			<ul>
				{Object.keys(DEFAULT_FORM_STORE).map((key: string) => {
					if (key === FORM_FIELD.RETYPED_PASSWORD) {
						return null;
					}
					i = i + 1;

					const content =
						key === FORM_FIELD.PASSWORD
							? getMaskedInput(formFieldMap[key as FORM_FIELD])
							: formFieldMap[key as FORM_FIELD];

					return (
						<Field key={key} isOdd={i % 2 === 0}>
							{key}: {content || "Missing value"}
						</Field>
					);
				})}
			</ul>
			{formError && (
				<span>There are errors in your form preventing the submission.</span>
			)}
			<div>
				<BackButton onClick={handleBackClick} />
				<Button type="submit">
					<span>Submit form</span>
				</Button>
			</div>
		</Form>
	);
};
