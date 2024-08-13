import { Box, Button, Icon, List, ListItem, useColorMode } from "@chakra-ui/react"
import { Tabs } from "../Layout/SideBar"
import { Link } from "react-router-dom";
import useLanguage from "../../stores/LanguageStore";
import { useTranslation } from "react-i18next";
const ListTabs = () => {
  const {lng} = useLanguage();
  const {t} = useTranslation();
  const {colorMode} = useColorMode();
  return (
    <List >
     {Object.entries(Tabs).map(([name, icon], index) => (
        <Box
          key={index}
          borderBottom="1px"
          borderColor="gray.200"
          pb={3}
          _last={{ borderBottom: "none" }}
          _hover={{
            bg: "gray.500",
            ".icon-hover": {
              transform: "scale(1.5)",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >
          <ListItem textAlign={"center"} py={4}>
            <Link to={`/${name}`}>
              <Icon
                as={icon}
                mr={2}
                ml={lng === "ar" ? 2 : 0}
                className="icon-hover"
              />
              <Button
                fontSize={"large"}
                variant={"link"}
                color={colorMode === 'dark' ? "white" :"black"}
              >
                {t(name)}
              </Button>
            </Link>
          </ListItem>
        </Box>
      ))}
    </List>
  )
}

export default ListTabs