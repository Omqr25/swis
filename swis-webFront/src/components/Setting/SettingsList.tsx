import { Box, Divider, Heading, Icon, List, ListItem } from "@chakra-ui/react";
import { FaLanguage } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import { Languages } from "./Languages";
import { useTranslation } from "react-i18next";
import { FcDeleteDatabase } from "react-icons/fc";
export const SettingsList = () => {
  const settingsList: Record<string, IconType> = {
    Languages : FaLanguage,
    DeletedItems : FcDeleteDatabase
  };
  const {t} = useTranslation();
  return (
    <List m={2}>
        <Heading p={1}>{t("Settings")}</Heading>
        <Divider borderColor={"black"} borderWidth={2} /> 
        <Box 
        m={1}
        p={3}
        >
          <ListItem justifyContent={'space-between'}>
          {t("Languages")}
          <Languages />
          </ListItem>
        </Box>
        {Object.entries(settingsList).map(([name , icon] , index) => (
        <Box
         key={index}
         m={1}
         p={3}
         _hover={{
            bg:"gray.500"
         }}
        >
          <Link to ={`/settings/${name}`}>
          <ListItem>
          <Icon as={icon} mr={2}/>
            {t(name)}
            </ListItem>
            </Link>  
        </Box>
        ))}
    </List>
  )
}
