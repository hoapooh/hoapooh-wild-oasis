import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import NewUsers from './pages/Users'
import Settings from './pages/Settings'
import Account from './pages/Account'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './ui/AppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import Booking from './pages/Booking'
import Checkin from './pages/Checkin'
import ProtectedRoute from './ui/ProtectedRoute'
import DarkModeProvider from './context/DarkModeContext'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback.jsx'

// The stale time is the time it takes for the data to be considered stale and refetched
// If some new data is changed before the stale time reached, it will not immediately refetched, but when you change tab and then return
// it will move from stale --> fetching --> fresh
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
})

const router = createBrowserRouter([
	{
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
				<ProtectedRoute>
					<AppLayout />
				</ProtectedRoute>
			</ErrorBoundary>
		),
		children: [
			{
				path: '/',
				element: <Dashboard />,
			},
			{
				path: '/bookings',
				element: <Bookings />,
			},
			{
				path: '/bookings/:bookingId',
				element: <Booking />,
			},
			{
				path: '/checkin/:bookingId',
				element: <Checkin />,
			},
			{
				path: '/cabins',
				element: <Cabins />,
			},
			{
				path: '/users',
				element: <NewUsers />,
			},
			{
				path: '/settings',
				element: <Settings />,
			},
			{
				path: '/account',
				element: <Account />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
])

function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster
					position='top-center'
					gutter={12}
					containerStyle={{ margin: '8px' }}
					toastOptions={{
						duration: 3000,
						success: {
							duration: 2000,
						},
						error: {
							duration: 4000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							backgroundColor: 'var(--color-grey-0)',
							color: 'var(--color-grey-700)',
						},
					}}
				/>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
			</QueryClientProvider>
		</DarkModeProvider>
	)
}

export default App

{
	/* <Routes>
	<Route element={<AppLayout />}>
		<Route index element={<Navigate replace to={"dashboard"} />} />
		<Route path="dashboard" element={<Dashboard />} />
		<Route path="bookings" element={<Bookings />} />
		<Route path="cabins" element={<Cabins />} />
		<Route path="users" element={<NewUsers />} />
		<Route path="settings" element={<Settings />} />
		<Route path="account" element={<Account />} />
	</Route>
	<Route path="login" element={<Login />} />
	<Route path="*" element={<PageNotFound />} />
</Routes> */
}
