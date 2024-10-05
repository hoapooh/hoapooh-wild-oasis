import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
// import { PAGE_SIZE } from '../../utils/constants'

export function useBookings() {
	// const queryClient = useQueryClient()
	const [searchParams] = useSearchParams()

	// FILTER VALUE
	const filterValue = searchParams.get('status')

	// When you want to add more condition to the filter, you can add an Array instead of an object
	// Now go to apiBookings page at line 13
	const filter =
		!filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

	// SORT VALUE
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
	const [field, direction] = sortByRaw.split('-')
	const sortBy = { field, direction }

	// PAGINATION
	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

	const {
		isPending,
		// count is the second argument
		data: { data: bookings, count } = {},
		error,
		isPlaceholderData,
	} = useQuery({
		// With the same queryKey, the data will be read from the cache if it is executed on the other place
		// queryFn (Query Function) needs to return an Promise
		// Add more value that we want the query to depends on -- now when the filter change, React query will refetch data
		// HACK: This can be understand as an dependencies array of useQuery -- the same as useEffect
		queryKey: ['bookings', filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
		// You can use this instead of pre-fetch data
		// This one is also increase the UX the same as pre-fetch
		// It means that the data of the next page will not show up like you render every time
		placeholderData: keepPreviousData,
	})

	// NOTE: PRE-FETCHING
	// const pageCount = Math.ceil(count / PAGE_SIZE)

	// if (page < pageCount)
	// 	queryClient.prefetchQuery({
	// 		queryKey: ['bookings', filter, sortBy, page + 1],
	// 		queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
	// 	})

	// if (page > 1)
	// 	queryClient.prefetchQuery({
	// 		queryKey: ['bookings', filter, sortBy, page - 1],
	// 		queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
	// 	})

	return { isPending, bookings, error, count, isPlaceholderData }
}
