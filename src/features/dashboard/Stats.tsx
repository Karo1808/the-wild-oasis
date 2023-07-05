import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { bookingsAfterDate, stayType } from "../../services/apiBookings";

interface Props {
  bookings?: bookingsAfterDate[];
  confirmedStays: stayType[];
  numDays: number;
  cabinCount: number;
}

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }: Props) => {
  if (!bookings) return null;
  const numBokings = bookings.length ?? 0;

  const sales = bookings.reduce(
    (sales: number, booking: bookingsAfterDate) => sales + booking.totalPrice,
    0
  );

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce(
      (nights: number, cur: stayType) => nights + cur.numNights,
      0
    ) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={String(numBokings)}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={String(checkins)}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
