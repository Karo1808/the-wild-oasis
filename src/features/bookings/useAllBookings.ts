import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useAllBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter: { field: string; value: string } | null =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const { isLoading, data: allBookings } = useQuery({
    queryKey: ["bookings", filter],
    // eslint-disable-next-line
    //@ts-ignore
    queryFn: () => getAllBookings({ filter }),
  });
  return { allBookings, isLoading };
};
