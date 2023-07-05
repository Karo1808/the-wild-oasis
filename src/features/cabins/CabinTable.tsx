import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import { BookingType } from "../bookings/BookingType";
import BookingRow from "../bookings/BookingRow";

interface CabinData {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
  id?: string;
  [key: string]: any;
}

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins) return null;
  if (!cabins.length) return <Empty resource="cabins" />;

  // Filter
  const filterValue = searchParams.get("discount") || "all";

  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  //  Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins?.sort(
    (a: CabinData, b: CabinData) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
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
      </Table>
    </Menus>
  );
};

export default CabinTable;
