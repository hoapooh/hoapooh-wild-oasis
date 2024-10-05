import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'
import toast from 'react-hot-toast'

function useDeleteBooking() {
	const queryClient = useQueryClient()

	const { isPending: isDeletingBooking, mutate: deleteBooking } = useMutation({
		mutationFn: (bookingId) => deleteBookingApi(bookingId),
		onSuccess: () => {
			toast.success(`Booking deleted successfully!`)

			queryClient.invalidateQueries({ queryKey: ['bookings'] })
		},
		onError: (err) => toast.error(err.message),
	})

	return { isDeletingBooking, deleteBooking }
}

export default useDeleteBooking
