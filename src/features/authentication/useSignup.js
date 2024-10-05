import { useMutation } from '@tanstack/react-query'
import { signup as signupApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useSignup() {
	const { mutate: signup, isPending } = useMutation({
		mutationFn: signupApi,
		onSuccess: () => {
			toast.success('User created successfully. Please verify the email address being send')
		},
		onError: (err) => {
			console.log(err)
			toast.error(err.message)
		},
	})

	return { signup, isPending }
}
