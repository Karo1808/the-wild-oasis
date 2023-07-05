import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { bookings } from "../../data/data-bookings";
import { useNavigate } from "react-router-dom";

export const useDeleteBooking = (bookingId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: () => deleteSingleBooking(bookingId),
    onSuccess: () => {
      toast.success(`Booking #${bookingId} successfully deleted `);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },
    onError: () => toast.error("There was an error while deleting the booking"),
  });

  return { deleteBooking, isDeletingBooking };
};
