import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'

function useCheckOut() {
	const queryClient = useQueryClient()

	const { isPending: isCheckingOut, mutate: checkout } = useMutation({
		mutationFn: (bookingId) => updateBooking(bookingId, { status: 'checked-out' }),
		// this data params in the onSuccess is returned from the mutationFn
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked out successfully!`)

			queryClient.invalidateQueries({ active: true })
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	return { isCheckingOut, checkout }
}

export default useCheckOut
