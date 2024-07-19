import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { AddButton } from "../components/AddButton";
import SubWarehouse from "../components/Warehouse/SubWarehouse";
import { WarehouseGrid } from "../components/Warehouse/WarehouseGrid";
import CustomModal from "../components/Modal";
import { WarehouseForm } from "../components/Warehouse/WarehouseForm";

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
    <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <WarehouseForm isEdit={false} ID={1} />
      </CustomModal>
    </Box>
)};
