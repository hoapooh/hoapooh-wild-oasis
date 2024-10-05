import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
	const queryClient = useQueryClient();

	const { isPending: isUpdating, mutate: updateCabin } = useMutation({
		// In Tanstack Query we can only passed in one argument
		// here that why we need to passed in the second argument inside an object, but not the real second arguments
		// it can be called options object
		mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully updated");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { isUpdating, updateCabin };
}
