import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useAllBookings } from "./useAllBookings";

function BookingTable() {
  const { allBookings, isLoading: allLoading } = useAllBookings();
  const { bookings, isLoading } = useBookings(allBookings?.length);
  if (!allBookings) return null;

  if (isLoading || allLoading) return <Spinner />;
  if (!bookings) return null;
  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={allBookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
