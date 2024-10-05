import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './styles/GlobalStyles.js'
import { StyleSheetManager } from 'styled-components'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<StyleSheetManager shouldForwardProp={() => true}>
			<GlobalStyles />
			<App />
		</StyleSheetManager>
	</StrictMode>
)
