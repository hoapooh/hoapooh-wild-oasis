import styled from 'styled-components'
import Logout from './Logout'
import ButtonIcon from './ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`

export default function HeaderMenu() {
	const nav = useNavigate()

	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => nav('/account')}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
				<DarkModeToggle />
			</li>
			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	)
}
