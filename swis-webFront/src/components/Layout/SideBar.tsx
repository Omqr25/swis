import {
  Box,
  Button,
  Divider,
  Icon,
  List,
  ListItem,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
  FaBoxOpen,
  FaChartLine,
  FaCodeBranch,
  FaExchangeAlt,
  FaHandHoldingHeart,
  FaHome,
  FaTruck,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import Mycolor, { MyDarkColor } from "../../constants";
import useLanguage from "../../stores/LanguageStore";
export const Tabs: Record<string, IconType> = {
  Home: FaHome,
  Branches: FaCodeBranch,
  Warehouses: FaWarehouse,
  Keepers: FaUsers,
  Drivers: FaTruck,
  Donors: FaHandHoldingHeart,
  Products: FaBoxOpen,
  Transactions: FaExchangeAlt,
  Reports: FaChartLine,
};
export const SideBar = () => {
  const { t } = useTranslation();

  const { colorMode } = useColorMode();

  const location = useLocation();


  const colorr = colorMode === "light" ? Mycolor : MyDarkColor;
  
  const lng = useLanguage((s) => s.lng);
  
  return (
    <List bgColor={colorr} w={"200px"} color={"white"}>
      <Divider />
      {Object.entries(Tabs).map(([name, icon], index) => (
        <Box
          key={index}
          borderBottom="1px"
          borderColor="gray.200"
          pb={3}
          bgColor={location.pathname.startsWith(`/${name}`) ? "red.500" : ""}
          _last={{ borderBottom: "none" }}
          _hover={{
            bg: "red.500",
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
                color={"white"}
              >
                {t(name)}
              </Button>
            </Link>
          </ListItem>
        </Box>
      ))}
    </List>
  );
};
