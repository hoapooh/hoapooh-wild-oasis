import styled, { keyframes } from "styled-components";

const l14 = keyframes`
  100% {transform: rotate(0.2deg)}
`;

const Spinner = styled.div`
	margin: 4.8rem auto;

	width: 4rem;
	aspect-ratio: 1.154;
	display: grid;
	background: conic-gradient(from 149deg at top, #0000, #bf1e62 1deg 60deg, #0000 61deg);
	animation: ${l14} 2s infinite cubic-bezier(0.5, 500, 0.5, -500);
	transform-origin: top;

	&:before,
	&:after {
		content: "";
		grid-area: 1/1;
		background: conic-gradient(from 149deg at top, #0000, #ffa588 1deg 60deg, #0000 61deg);
		transform-origin: inherit;
		animation: inherit;
	}

	&:after {
		background: conic-gradient(from 149deg at top, #0000, #027b7f 1deg 60deg, #0000 61deg);
		animation-timing-function: cubic-bezier(0.5, 800, 0.5, -800);
	}
`;

export default Spinner;
