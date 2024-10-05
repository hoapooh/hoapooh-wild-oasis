import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const { isPending, settings } = useSetting();
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isPending) return <Spinner />;

	// You can destructure the settings here after checking for the isPending status or just add the "|| {}" next to the settings
	// Because when it is not fetched yet, it will return the undefined and you can not destructure it
	const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } =
		settings || {};

	function handleUpdate(e) {
		const { value, id, defaultValue } = e.target;

		if (!value || !id || defaultValue === value) return;
		updateSetting({ [id]: value });
		e.target.defaultValue = value;
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="minBookingLength"
					disabled={isUpdating}
					defaultValue={minBookingLength}
					onBlur={(e) => handleUpdate(e)}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="maxBookingLength"
					disabled={isUpdating}
					defaultValue={maxBookingLength}
					onBlur={(e) => handleUpdate(e)}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="maxGuestsPerBooking"
					disabled={isUpdating}
					defaultValue={maxGuestsPerBooking}
					onBlur={(e) => handleUpdate(e)}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfastPrice"
					disabled={isUpdating}
					defaultValue={breakfastPrice}
					onBlur={(e) => handleUpdate(e)}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
