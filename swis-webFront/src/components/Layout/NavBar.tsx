import { HStack, IconButton, Image } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png";
import profile from "../../assets/Profile.jfif";
import Mycolor from "../../constants";
import { ColorModeSwitch } from "../ColorModeSwitch";
import { SearchInput } from "../SearchInput";
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
  return (
    <HStack
      justifyContent={"space-between"}
      bgColor={Mycolor}
      p={2}
      color={"white"}
    >
      <Link to={"/Home"}>
        <Image
          src={logo}
          boxSize="60px"
          w={"150px"}
          bgColor={Mycolor}
          objectFit={"fill"}
          borderRadius={20}
        ></Image>
      </Link>
      <Link to={"/settings"}>
        <IconButton
          aria-label=""
          icon={<IoMdSettings size={"30px"} color="white" />}
          bgColor={Mycolor}
          _hover={{ bg: "red.500" }}
          css={animation}
        ></IconButton>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
      <Link to={"/notifications"}>
        <IconButton
          aria-label=""
          icon={<IoIosNotifications size={"30px"} color="white" />}
          bgColor={Mycolor}
          _hover={{ bg: "red.500" }}
        ></IconButton>
      </Link>
      <Link to={"/profile"}>
        <Image src={profile} borderRadius={"50%"} boxSize={"60px"} />
      </Link>
    </HStack>
  );
};
