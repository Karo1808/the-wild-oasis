import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";

export const useSingleBooking = () => {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { booking, isLoading };
};
