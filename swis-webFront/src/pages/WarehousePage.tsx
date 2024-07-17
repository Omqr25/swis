import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { AddButton } from "../components/AddButton";
import SubWarehouse from "../components/Warehouse/SubWarehouse";
import { WarehouseGrid } from "../components/Warehouse/WarehouseGrid";

export const WarehousePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  
  return (
  <Box>
  <Grid
  templateAreas={`"MainWarehouse SubWarehouse"`}
  gridTemplateColumns={"2fr 1fr"}
  >
    <GridItem area={"MainWarehouse"}>
    <WarehouseGrid />
    </GridItem>
    <GridItem area="SubWarehouse">
      <SubWarehouse />
    </GridItem>
    </Grid>
    <AddButton onOpen={onOpen} />
    </Box>
)};
