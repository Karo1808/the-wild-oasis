import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface Props {
  bookings?: any;
  confirmedStays: any;
  numDays: number;
  cabinCount: number;
}

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }: Props) => {
  const numBokings = bookings.length;

  const sales = bookings.reduce(
    (sales: number, booking) => sales + booking.totalPrice,
    0
  );

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((nights: number, cur) => nights + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBokings}
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
        value={checkins}
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
