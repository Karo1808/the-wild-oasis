import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const useCheckIn = () => {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationKey: ["bookings", bookingId],
    mutationFn: ({
      breakfast,
    }: {
      breakfast: {
        hasBreakfast?: boolean;
        extrasPrice?: number;
        totalPrice?: number;
      };
    }) =>
      // eslint-disable-next-line
      // @ts-ignore
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkIn, isCheckingIn };
};
