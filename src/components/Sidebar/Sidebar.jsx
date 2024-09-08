import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants.jsx";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout.js";
import SidebarItems from "./SidebarItems.jsx";

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        {/* This code: Link to={"/"} as={RouterLink} allows us to use the link as it's coming from react-router-dom,
        but also allows us to add styles to it as it's also coming from chakra */}
        {/* This will be the Logo used on the Desktop */}
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        {/* This will be the Logo used on Mobile */}
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          // Hover state in chakra
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        {/* Logout */}
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right" // The Tooltip will be on the right when you hover over it
          ml={1}
          openDelay={500} // This will add a half a second delay when you hover over an item
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            mt={"auto"} // This will push the button to the bottom
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
