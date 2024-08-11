import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  List,
  ListItem,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useLanguage from "../../stores/LanguageStore";
import Mycolor from "../../constants";
import { details } from "../../entities/Transactions";

interface Props {
  items: details[];
}

export const ItemsDrawer = ({ items }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { t } = useTranslation();
  const lng = useLanguage((s) => s.lng);
  const {colorMode} = useColorMode();
  return (
    <>
      <IconButton
        ref={btnRef}
        icon={lng === "en" ? <FaArrowRight /> : <FaArrowLeft />}
        bgColor={colorMode === 'dark' ? 'black' : 'white'}
        onClick={(e) => {
            e.stopPropagation();
            if(onOpen){
                console.log(isOpen)
                onOpen();
            }
        }}
        aria-label="Open Drawer"
        />
        <Drawer
          isOpen={isOpen}
          placement={lng == "en" ? "right" : "left"}
          onClose={onClose}
          finalFocusRef={btnRef}
          size={'md'}
         
        >
          <DrawerOverlay />
          <DrawerContent m={5} borderRadius={20}>
            <DrawerCloseButton />
            <DrawerHeader bgColor={Mycolor} color={"white"}>
              <Text textAlign={'center'}>{t("Items")}</Text>
            <HStack justifyContent={"space-between"} >
                      <Text>{t('Name')}</Text>
                      <Text>{t("Quantity")}</Text>
                      </HStack>
            </DrawerHeader>
            <DrawerBody
              bgColor={Mycolor}
              overflowY={"auto"}
              maxHeight={"100vh"}
            >
              <Divider borderWidth={'2px'}/>
              <List color={"white"}>
                {items.map((item, index) => (
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
                    <ListItem py={4} borderBottom={'1px'}>
                      <HStack justifyContent={"space-between"} >
                      <Text>{item.item}</Text>
                      <Text>{item.quantity}</Text>
                      </HStack>
                    </ListItem>
                  </Box>
                ))}
                <Text textAlign={'center'}>No More Items Were added</Text>
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      
    </>
  );
};
