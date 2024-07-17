import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoReorderThreeSharp, IoNotificationsCircle } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import MyColor from "../../constants";
import useLanguage from "../../stores/LanguageStore";
import { Tabs } from "./SideBar";
function Drawerr() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { t } = useTranslation();
  const lng = useLanguage((s) => s.lng);
  return (
    <>
      <IconButton
        ref={btnRef}
        icon={<IoReorderThreeSharp />}
        onClick={onOpen}
        aria-label="Open Drawer"
      />
      <Drawer
        isOpen={isOpen}
        placement={lng == "en" ? "left" : "right"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor={MyColor} color={"white"}>
            {"SWIS"}
          </DrawerHeader>
          <DrawerBody bgColor={MyColor} overflowY={"auto"} maxHeight={"100vh"}>
            <Divider />
            <List color={"white"}>
              <Box
                pb={3}
                _last={{ borderBottom: "none" }}
                _hover={{
                  bg: "gray.700",
                  ".icon-hover": {
                    transform: "scale(1.5)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <Link to={`/Profile`}>
                  <ListItem textAlign={lng == "en" ? "left" : "right"} py={4}>
                    <Icon as={CgProfile} mr={2} ml={2} className="icon-hover" />
                    <Button fontSize={"large"} variant={"link"} color={"white"}>
                      {t("Profile")}
                    </Button>
                  </ListItem>
                </Link>
              </Box>
              <Box
                pb={3}
                _last={{ borderBottom: "none" }}
                _hover={{
                  bg: "gray.700",
                  ".icon-hover": {
                    transform: "scale(1.5)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <Link to={`/Notifications`}>
                  <ListItem textAlign={lng == "en" ? "left" : "right"} py={4}>
                    <Icon
                      as={IoNotificationsCircle}
                      mr={2}
                      ml={2}
                      className="icon-hover"
                    />
                    <Button fontSize={"large"} variant={"link"} color={"white"}>
                      {t("Notifications")}
                    </Button>
                  </ListItem>
                </Link>
              </Box>
              {Object.entries(Tabs).map(([name, icon], index) => (
                <Box
                  key={index}
                  pb={3}
                  _last={{ borderBottom: "none" }}
                  _hover={{
                    bg: "gray.700",
                    ".icon-hover": {
                      transform: "scale(1.5)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <Link to={`/${name}`}>
                    <ListItem textAlign={lng == "en" ? "left" : "right"} py={4}>
                      <Icon as={icon} mr={2} ml={2} className="icon-hover" />
                      <Button
                        fontSize={"large"}
                        variant={"link"}
                        color={"white"}
                      >
                        {t(name)}
                      </Button>
                    </ListItem>
                  </Link>
                </Box>
              ))}
              <Box
                pb={3}
                _hover={{
                  bg: "gray.700",
                  ".icon-hover": {
                    transform: "scale(1.5)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
              >
                <ListItem textAlign={lng == "en" ? "left" : "right"} py={4}>
                  <Icon as={MdLogout} mr={2} ml={2} className="icon-hover" />
                  <Button fontSize={"large"} variant={"link"} color={"white"}>
                    {t("Logout")}
                  </Button>
                </ListItem>
              </Box>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default Drawerr;
