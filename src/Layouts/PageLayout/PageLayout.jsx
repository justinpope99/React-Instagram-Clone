// This page will be used to display our sidebar on all the pages except the AuthPage

import { Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.js";
import Navbar from "../../components/Navbar/Navbar.jsx";

// Instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebar on every page except the AuthPage.

// Whatever page we are in, its content will be considered the children, which will be placed on the right side of the screen
const PageLayout = ({ children }) => {
  // We will use this to determine if we are on the AuthPage
  const { pathname } = useLocation();
  // The user is coming from Firebase
  const [user, loading] = useAuthState(auth);
  // We will render the sidebar if we're not on the Auth Page, and the user is signed in
  const canRenderSidebar = pathname !== "/auth" && user;
  // We are adding a Navbar to login or signup only for users who are not logged in.
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  // We will have a loading spinner if the user is authenticated. When the page is first loading, user will be true and loading will be null because it will try to fetch in the background if the user is authenticated or not.
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    // If the Navbar is rendered, we will have a flex direction of column, so that the Navbar appears on top.
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* The Sidebar will be on the left side of the screen */}
      {/* If we are not in the auth page, render the Sidebar, else ignore this part */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}
      {/* The page content (children) will be on the right */}
      <Box
        flex={1}
        w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
        mx={"auto"} // This will center the page content
      >
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

// This is a loading spinner. This is useful if the user's internet connection is poor, we can show a spinner as we are waiting to see if the user is authenticated.
const PageLayoutSpinner = () => {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};
