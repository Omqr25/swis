import { Box, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import Mycolor, { MyDarkColor } from "../constants";
export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const IconComponent = colorMode === "light" ? FaMoon : FaSun;
  const colorr = colorMode === "light" ? Mycolor : MyDarkColor;
  return (
    <HStack>
      <IconButton
        aria-label={`switch to ${
          colorMode === "light" ? "dark" : "light"
        } mode `}
        icon={<Box as={IconComponent} size="24px" color="white" />}
        onClick={toggleColorMode}
        bgColor={colorr}
        _hover={{ bg: "red.500" }}
      />
    </HStack>
  );
};
