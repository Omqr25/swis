import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { AddButton } from "../components/AddButton";
import { BranchForm } from "../components/Branch/BranchForm";
import { BranchTable } from "../components/Branch/BranchTable";
import { SubBranch } from "../components/Branch/SubBranch";
import CustomModal from "../components/Modal";
import { useLocation } from "react-router-dom";
import BranchSearchTable from "../components/Branch/BranchSearchTable";
export const BranchPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const location = useLocation();
  const currentPath = location.pathname; 

  const Search = currentPath.includes("Search");
  return (
    <Box>
      <Grid
        templateAreas={`"MainBranch SubBranch"`}
        gridTemplateColumns={"2fr 1fr"}
      >
        <GridItem area={"MainBranch"}>
          {Search ? <BranchSearchTable />:<BranchTable />}
        </GridItem>
        <GridItem area={"SubBranch"}>
          <SubBranch />
        </GridItem>
      </Grid>
      <AddButton onOpen={onOpen} />
        <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <BranchForm isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  );
};
