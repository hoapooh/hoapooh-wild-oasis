import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	// mutate is a function that make changes base on the mutationFn you passed in
	// We can invalidating the cache as soon as the mutation is done to refetch
	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: (id) => deleteCabinApi(id),
		onSuccess: () => {
			toast.success("Cabin successfully deleted");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
