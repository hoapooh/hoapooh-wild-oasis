import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import ButtonIcon from './ButtonIcon'
import { useLogout } from '../features/authentication/useLogout'
import SpinnerMini from './SpinnerMini'

function Logout() {
	const { logout, isPending } = useLogout()

	return (
		<div>
			<ButtonIcon disabled={isPending} onClick={logout}>
				{!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
			</ButtonIcon>
		</div>
	)
}

export default Logout
