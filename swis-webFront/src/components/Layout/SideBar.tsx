import { Box, Button, Divider, Icon, List, ListItem, useColorMode } from "@chakra-ui/react";
import {
    FaBoxOpen,
    FaChartLine,
    FaCodeBranch,
    FaExchangeAlt,
    FaHandHoldingHeart,
    FaTruck,
    FaUsers,
    FaWarehouse,
    FaHome
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import Mycolor, { MyDarkColor } from "../../constants";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useLanguage from "../../stores/LanguageStore";
export const Tabs: Record<string, IconType> = {
  Home:FaHome,
  Branches: FaCodeBranch,
  Warehouses: FaWarehouse,
  Users: FaUsers,
  Drivers: FaTruck,
  Donor: FaHandHoldingHeart,
  Products: FaBoxOpen,
  Transactions: FaExchangeAlt,
  Reports: FaChartLine,
};
export const SideBar = () => {
  const {t} = useTranslation();
  const {colorMode} = useColorMode();
  const [selectedTab , setSelectedTab] = useState('d');
  const colorr = colorMode === "light" ? Mycolor : MyDarkColor;
  const lng = useLanguage(s => s.lng);
  return (
    <List bgColor={colorr} w={"200px"} color={"white"} h={"89vh"}>
      <Divider />
      {Object.entries(Tabs).map(([name, icon], index) => (
        <Box
          key={index}
          borderBottom="1px"
          borderColor="gray.200"
          pb={3}
          bgColor={selectedTab === name ? 'red.500' : ''}
          _last={{ borderBottom: "none" }}
          _hover={{bg:'red.500',
          '.icon-hover': {
            transform: 'scale(1.5)', 
            transition: 'transform 0.3s ease-in-out',
          }
          }}
        >
          <ListItem textAlign={'center'} py={4}>
            <Link to={`/${name}`}>
              <Icon as={icon} mr={2} ml={lng === 'ar' ? 2 : 0} className="icon-hover"/>
              <Button fontSize={"large"} variant={"link"} color={"white"} onClick={() => setSelectedTab(name)}>
                {t(name)}
              </Button>
            </Link>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};
