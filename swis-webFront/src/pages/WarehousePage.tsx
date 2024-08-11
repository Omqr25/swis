import {
  Box,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddButton } from "../components/AddButton";
import SubWarehouseTab from "../components/Warehouse/SubWarehouseTab";
import { WarehouseGrid } from "../components/Warehouse/WarehouseGrid";
import CustomModal from "../components/Modal";
import { WarehouseForm } from "../components/Warehouse/WarehouseForm";
import { t } from "i18next";
import WarehouseItemsTab from "../components/Warehouse/WarehouseItemsTab";

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
          <Tabs justifyContent={"space-between"} p={2}>
            <TabList >
              <Tab pr={24}>
                <Text ml={16}>{t("Items")}</Text>
              </Tab>
              <Tab pr={20} >
                <Text ml={8} textAlign={'center'}>{t("SubWarehouses")}</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <WarehouseItemsTab/>
              </TabPanel>
              <TabPanel>
                <SubWarehouseTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
      <AddButton onOpen={onOpen} />
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <WarehouseForm isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  );
};
