import { HStack, IconButton, Image, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import profile from "../../assets/Profile.jfif";
import Mycolor, { MyDarkColor } from "../../constants";
import { ColorModeSwitch } from "../ColorModeSwitch";
import { SearchInput } from "../SearchInput";
import Drawerr from "./Drawer";
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const animation = css`
  animation: ${rotate} 2s linear infinite;
`;
export const NavBar = () => {
  const {colorMode} = useColorMode();
  const showTabs = useBreakpointValue({ base: false, md: true });
  const colorr = colorMode === "light" ? Mycolor : MyDarkColor;
  return (
    <HStack
      justifyContent={"space-between"}
      bgColor={colorr}
      spacing={1}
      p={2}
      w={"100%"}
      color={"white"}
    >
      <Link to={"/Home"}>
        <Image
          src={logo}
          boxSize="60px"
          w={{lg:"150px" , base:"100px"}}
          bgColor={colorr}
          objectFit={"fill"}
          borderRadius={20}
        ></Image>
      </Link>
      {!showTabs && <Drawerr />}
      <Link to={"/settings"}>
        <IconButton
          aria-label=""
          icon={<IoMdSettings size={"30px"} color="white" />}
          bgColor={colorr}
          _hover={{ bg: "red.500" }}
          css={animation}
        ></IconButton>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
      {showTabs &&
      <>
      <Link to={"/notifications"}>
        <IconButton
          aria-label=""
          icon={<IoIosNotifications size={"30px"} color="white" />}
          bgColor={colorr}
          _hover={{ bg: "red.500" }}
        ></IconButton>
      </Link>
      <Link to={"/profile"}>
        <Image src={profile} borderRadius={"50%"} boxSize={"60px"} />
      </Link> 
      </>
      }
      
    </HStack>
  );
};
