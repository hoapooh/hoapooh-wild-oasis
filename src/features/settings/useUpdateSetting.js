import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { isPending: isUpdating, mutate: updateSetting } = useMutation({
		// In Tanstack Query we can only passed in one argument
		// here that why we need to passed in the second argument inside an object, but not the real second arguments
		// it can be called options object
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("Setting successfully updated");

			queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { isUpdating, updateSetting };
}
