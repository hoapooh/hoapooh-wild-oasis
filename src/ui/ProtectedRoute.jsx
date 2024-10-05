import { useEffect } from 'react'
import { useUser } from '../features/authentication/useUser'
import SpinnerFull from './SpinnerFull'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
	const navigate = useNavigate()

	// 1. Load the authenticated user from the API
	const { isPending, isAuthenticated, isFetching } = useUser()

	// 2. If there is NO authenticated user, redirect to the login page
	useEffect(() => {
		if (!isAuthenticated && !isPending && !isFetching) navigate('/login')
	}, [isAuthenticated, isPending, navigate, isFetching])

	// 3. While loading, show a loading indicator
	if (isPending) return <SpinnerFull />

	// 4. If there is an authenticated user, show the children
	if (isAuthenticated) return children
}

export default ProtectedRoute
