import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useSingleBooking } from "../bookings/useSingleBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isLoading } = useSingleBooking();
  const { checkIn, isCheckingIn } = useCheckIn();
  const { settings, isLoadingSettings } = useSettings();

  useEffect(() => {
    if (booking) setConfirmPaid(booking.isPaid);
  }, [booking]);

  if (!booking) return null;
  if (!settings) return null;
  if (isLoading || isLoadingSettings) return <Spinner />;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * booking.numNights * booking.numGuests;

  const totalPrice = booking?.totalPrice ?? 0;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox
        booking={
          addBreakfast
            ? {
                ...booking,
                hasBreakfast: true,
                totalPrice: optionalBreakfastPrice + booking?.totalPrice,
                extrasPrice: optionalBreakfastPrice,
              }
            : booking
        }
      />

      {!booking.hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((b) => !b);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {booking.guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(booking.totalPrice ?? 0)
            : formatCurrency(
                (booking.totalPrice ?? 0) + optionalBreakfastPrice
              )}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{booking.id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
