import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'
import { useSearchParams } from 'react-router-dom'

export function useCabins() {
	const [searchParams] = useSearchParams()

	// FILTER VALUE
	const filterValue = searchParams.get('discount')

	// NOTE: checkfor discount value that is 'all', 'equal to 0' or 'greater than 0'
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: filterValue === 'no-discount'
			? { field: 'discount', value: 0 }
			: { field: 'discount', value: 0, method: 'gt' }

	// SORT VALUE
	const sortByRaw = searchParams.get('sortBy') || 'name-asc'
	const [field, direction] = sortByRaw.split('-')
	const sortBy = { field, direction }

	const {
		isPending,
		data: cabins,
		error,
	} = useQuery({
		// With the same queryKey, the data will be read from the cache if it is executed on the other place
		// queryFn (Query Function) needs to return an Promise
		queryKey: ['cabins', filter, sortBy],
		queryFn: () => getCabins({ filter, sortBy }),
	})

	return { isPending, cabins, error }
}
