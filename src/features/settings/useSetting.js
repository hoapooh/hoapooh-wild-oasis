import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/apiSettings";

export function useSetting() {
	const {
		isPending,
		data: settings,
		error,
	} = useQuery({
		queryKey: ["settings"],
		// This function need to return Promise so the function inside is an async function
		queryFn: getSetting,
	});

	return { isPending, settings, error };
}
