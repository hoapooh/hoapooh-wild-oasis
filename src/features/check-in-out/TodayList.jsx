import styled from 'styled-components'
import TodayItem from './TodayItem'

const StyledTodayList = styled.ul`
	overflow: scroll;
	overflow-x: hidden;

	/* Removing scrollbars for webkit, firefox, and ms, respectively */
	&::-webkit-scrollbar {
		width: 0 !important;
	}
	scrollbar-width: none;
	-ms-overflow-style: none;
`

export default function TodayList({ activities }) {
	return (
		<StyledTodayList>
			{activities.map((activity) => (
				<TodayItem key={activity.id} activity={activity} />
			))}
		</StyledTodayList>
	)
}
