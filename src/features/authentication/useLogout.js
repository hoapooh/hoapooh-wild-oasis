import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
	const nav = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: logout, isPending } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			toast.success('Good bye!!')
			queryClient.removeQueries()
			nav('/login', { replace: true })
		},
	})

	return { logout, isPending }
}
