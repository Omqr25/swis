import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Layout/NavBar";
import { SideBar } from "../components/Layout/SideBar";


export const Layout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav"
               "main"`,
        lg: `"nav nav"
             "aside main"`,
      }}
      templateRows={{ lg: 'auto 1fr' }}
      templateColumns={{ lg: 'auto 1fr' }}
      h="100vh" 
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
