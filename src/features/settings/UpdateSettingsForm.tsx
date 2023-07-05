import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

const UpdateSettingsForm = () => {
  const { isLoading, settings } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};
  const { isUpdating, updateSetting } = useUpdateSetting();

  const handleUpdate = (
    e: React.FocusEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target as typeof e.target & {
      value: string;
    };
    if (!value) return;
    updateSetting({ [name]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "minBookingLength")
          }
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "maxBookingLength")
          }
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "maxGuestsPerBooking")
          }
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleUpdate(e, "breakfastPrice")
          }
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
