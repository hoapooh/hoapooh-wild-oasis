import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function useCheckin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { isPending: isCheckingIn, mutate: checkin } = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, { status: 'checked-in', isPaid: true, ...breakfast }),
		// this data params in the onSuccess is returned from the mutationFn
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked in successfully!`)

			queryClient.invalidateQueries({ active: true })
			navigate('/')
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	return { isCheckingIn, checkin }
}

export default useCheckin
