import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'

// This is how we'll customize our theme, we'll create a styles object and pass it into the theme
const styles = {
  // We are using the global key
  global:(props) => ({
    // We are choosing the body selector
    body:{
      // Here, we are setting the bgcolor and font-color for light/dark modes
      bg:mode("gray.100", "#000")(props),
      color:mode("gray.800", "whiteAlpha.900")(props)
    }
  })
}

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config, styles })

export default theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* We will wrap our application in BrowserRouter which will allow us to use any component from the react-router-dom library */}
    <BrowserRouter>
      {/* This allows our application to use any component that is coming from Chakra */}
      <ChakraProvider theme={theme}> {/* The dark theme will now be used in our entire application */}
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
