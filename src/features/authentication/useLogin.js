import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function useLogin() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: login, isPending: isLogin } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], data.user)
			toast.success('Login successfull')
			// The replace: true option in the navigate function is used to replace the current entry
			// in the history stack instead of adding a new one.
			// This is useful in scenarios where you don't want the user to be able to navigate back to the previous page using the browser's back button.
			navigate('/', { replace: true })
		},
		onError: (err) => {
			console.error('ERROR', err)
			toast.error('Provided email or password are incorrect')
		},
	})

	return { login, isLogin }
}

export default useLogin
