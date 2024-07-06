import { Grid, GridItem } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { SettingsList } from "../components/Setting/SettingsList"

export const SettingPage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"aside main"`,
      }}
      templateRows={{ lg: 'auto 1fr' }}
      templateColumns={{ lg: '1fr 3fr' }}
    >
      <GridItem
        area={"aside"}
      >
        <SettingsList />
      </GridItem>
      <GridItem  area={"main"} >
        <Outlet />
      </GridItem>
    </Grid>
  )
}
