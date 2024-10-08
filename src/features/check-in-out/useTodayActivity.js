import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'

export function useTodayActivity() {
	const { isPending: isPendingToday, data: staysTodayActivity } = useQuery({
		queryKey: ['today-activity'],
		queryFn: getStaysTodayActivity,
	})

	return { isPendingToday, staysTodayActivity }
}
