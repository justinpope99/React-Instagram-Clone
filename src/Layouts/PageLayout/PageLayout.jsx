// This page will be used to display our sidebar on all the pages except the AuthPage

import { Box, Flex } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar.jsx"
import { useLocation } from "react-router-dom"

// Instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebar on every page except the AuthPage.

// Whatever page we are in, its content will be considered the children, which will be placed on the right side of the screen
const PageLayout = ({ children }) => {

    // We will use this to determine if we are on the AuthPage
    const {pathname} = useLocation()

  return (
    <Flex>
        {/* The Sidebar will be on the left side of the screen */}
        {/* If we are not in the auth page, render the Sidebar, else ignore this part */}
        {pathname !== '/auth' ? (
            <Box w={{base:"70px", md:"240px"}}>
            <Sidebar />
        </Box>
        ) : null}
        {/* The page content (children) will be on the right */}
        <Box flex={1} w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}}>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout
