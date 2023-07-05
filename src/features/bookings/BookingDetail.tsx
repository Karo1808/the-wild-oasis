import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useSingleBooking } from "./useSingleBooking";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useSingleBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking(booking?.id);

  if (isLoading) return <Spinner />;
  if (!booking) return <Heading as="h1">No booking could be found</Heading>;

  const { status } = booking;

  const statusToTagName: { [key: string]: string } = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{booking.id}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkIn/${booking.id}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              onClick={() => {
                checkOut(booking?.id);
              }}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={`delete booking #${booking.id}`}
            disabled={isDeletingBooking}
            onConfirm={() => deleteBooking()}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
