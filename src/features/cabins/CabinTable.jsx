import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Empty from '../../ui/Empty'

function CabinTable() {
	const { isPending, cabins = [] } = useCabins()

	if (isPending) return <Spinner />

	if (!cabins.length) return <Empty resource={'cabins'} />

	// NOTE: THIS FILTER AND SORT IS AN OLD VERSION WHEN I TRUY TO DO STUFF NOT USING THE API SIDE FROM SUPABASE
	// FILTER TABLE
	// const filterValue = searchParams.get('discount') || 'all'

	// let filteredCabins

	// if (filterValue === 'all') filteredCabins = cabins
	// if (filterValue === 'no-discount') filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
	// if (filterValue === 'with-discount') filteredCabins = cabins.filter((cabin) => cabin.discount > 0)

	// SORT TABLE
	// const sortBy = searchParams.get('sortBy') || 'name-asc'
	// const [field, direction] = sortBy.split('-')
	// const modifier = direction === 'asc' ? 1 : -1
	// const sortedCabins = filteredCabins?.sort((a, b) => {
	// 	if (typeof a[field] === 'string') {
	// 		return a[field].localeCompare(b[field]) * modifier
	// 	} else {
	// 		return (a[field] - b[field]) * modifier
	// 	}
	// })

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>
				<Table.Body data={cabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
			</Table>
		</Menus>
	)
}

export default CabinTable
