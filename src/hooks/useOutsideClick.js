import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	useEffect(() => {
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				handler();
			}
		}

		// We need this event to be captured in the capturing phase (event move down the DOM tree)
		// Not the bubbling phase
		// giving the third element 'true' helps solve this problem
		// It helps preventing the event to not be triggered even the modal is not open
		document.addEventListener("click", handleClick, listenCapturing);

		return () => document.removeEventListener("click", handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return { ref };
}
