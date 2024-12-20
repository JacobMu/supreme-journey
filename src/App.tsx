import { Admin, CustomRoutes, memoryStore } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { Route } from "react-router-dom";
import { FormPage } from "./form/FormPage.tsx";
import { LAST_STEP_ROUTE, ROUTE } from "./form/types.ts";
import { EntryButton } from "./form/EntryButton.tsx";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => {
	return (
		<Admin
			dataProvider={dataProvider}
			dashboard={EntryButton}
			store={memoryStore()}
		>
			<CustomRoutes>
				<Route
					path={`/${ROUTE.STEP_1}`}
					element={<FormPage step={ROUTE.STEP_1} />}
				/>
				<Route
					path={`/${ROUTE.STEP_2}`}
					element={<FormPage step={ROUTE.STEP_2} />}
				/>
				<Route
					path={`/${ROUTE.STEP_3}`}
					element={<FormPage step={ROUTE.STEP_3} />}
				/>
				<Route
					path={`/${LAST_STEP_ROUTE}`}
					element={<div>The form has been successfully submitted</div>}
				/>
			</CustomRoutes>
		</Admin>
	);
};

export default App;
