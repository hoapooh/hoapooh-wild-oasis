import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

export function useBooking() {
	const { bookingId } = useParams()

	const {
		isPending,
		data: booking = {},
		error,
	} = useQuery({
		// With the same queryKey, the data will be read from the cache if it is executed on the other place
		// queryFn (Query Function) needs to return an Promise
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId),
		// React Query will try to fetch data in case it fails in the beginning
		// In this case, if it does not exist at first, so it will not need to fetch anymore
		retry: false,
	})

	return { isPending, booking, error }
}
