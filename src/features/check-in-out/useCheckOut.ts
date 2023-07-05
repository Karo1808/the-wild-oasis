import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { SingleBookingType } from "../../services/apiBookings";

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: (bookingId: string) =>
      // eslint-disable-next-line
      // @ts-ignore
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data?.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkOut, isCheckingOut };
};
