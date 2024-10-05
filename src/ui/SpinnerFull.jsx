import styled, { keyframes } from 'styled-components'

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`

const loaderKeyframes = keyframes`
  100% {
			background-size: 100%;
		}
`

const Spinner = styled.div`
	width: 120px;
	height: 20px;
	border-radius: 20px;
	background: repeating-linear-gradient(135deg, #f03355 0 10px, #ffa516 0 20px) 0/0% no-repeat,
		repeating-linear-gradient(135deg, #ddd 0 10px, #eee 0 20px) 0/100%;
	animation: ${loaderKeyframes} 1s infinite;
`

function SpinnerFull() {
	return (
		<FullPage>
			<Spinner />
		</FullPage>
	)
}

export default SpinnerFull
