import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Layout/NavBar";
import { SideBar } from "../components/Layout/SideBar";
import useLanguage from "../stores/LanguageStore";

const setDirection = () =>{
  const lng = useLanguage(s => s.lng);
  document.dir = lng ==='ar' ? 'rtl' : 'ltr';
}

export const Layout = () => {
  setDirection();
  return (
    <Grid
      templateAreas={{
        base: `"nav"
               "main"`,
        md: `"nav nav"
             "aside main"`,
      }}
      templateRows={{ md: 'auto 1fr' }}
      templateColumns={{ md: 'auto 1fr' }}
      
    >
      <GridItem
        area={"nav"}
        position="sticky" 
        top="0" 
        zIndex="sticky" 
        width="full" 
      >
        <NavBar />
      </GridItem>
      <Show above="lg">
      <GridItem
        area={"aside"} 
      >
        <SideBar />
      </GridItem>
      </Show>
      <GridItem  area={"main"} >
        <Outlet />
      </GridItem>
    </Grid>
  );
};
