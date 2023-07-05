import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useAllBookings } from "./useAllBookings";
import { BookingType } from "./BookingType";
import CabinRow from "../cabins/CabinRow";

function BookingTable() {
  const { allBookings, isLoading: allLoading } = useAllBookings();
  const { bookings, isLoading } = useBookings(allBookings?.length ?? 0);
  if (!allBookings) return null;

  if (isLoading || allLoading) return <Spinner />;
  if (!bookings) return null;
  if (!bookings.length) return <Empty resource="bookings" />;

  interface CabinData {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description: string;
    id?: string;
  }

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
          render={(item: CabinData | BookingType): JSX.Element => {
            if ("name" in item) {
              const cabin = item as CabinData;
              return <CabinRow cabin={cabin} key={cabin.id} />;
            } else {
              const booking = item as BookingType;
              return <BookingRow booking={booking} key={booking.id} />;
            }
          }}
        />
        <Table.Footer>
          <Pagination count={allBookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
