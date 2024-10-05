import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		// If the prop $active is true, apply the following styles
		props.$active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`

function Filter({ filterField, options }) {
	let [searchParams, setSearchParams] = useSearchParams()
	const currentFilter = searchParams.get(filterField) || options.at(0).value

	const page = searchParams.get('page')

	function handleClick(value) {
		// We need to handle this error because if you are on the page 3
		// but when the status is 'checked in' has only 1 paeg, it will crashed
		if (page) searchParams.delete('page')
		searchParams.set(filterField, value)
		setSearchParams(searchParams)
	}

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					// Add $ to indicate that this is a transient prop
					// It means that the props are not passed to the DOM
					// It's just a flag for styled-components
					// because the button doesn't have a prop named active
					$active={option.value === currentFilter}
					disabled={option.value === currentFilter}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	)
}
export default Filter
