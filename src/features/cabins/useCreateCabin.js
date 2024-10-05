import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUpdateCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export function useCreateCabin() {
	const queryClient = useQueryClient()

	// mutation use for create new cabin
	const { isPending: isCreating, mutate: createCabin } = useMutation({
		// In Tanstack Query we can only passed in one argument
		mutationFn: (newCabin) => createUpdateCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created')

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
		},
		onError: (err) => {
			toast.error(err.message)
		},
	})

	return { isCreating, createCabin }
}
