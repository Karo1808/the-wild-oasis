import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useAllBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const { isLoading, data: allBookings } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getAllBookings({ filter }),
  });
  return { allBookings, isLoading };
};
