import { AddIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, IconButton, useDisclosure } from "@chakra-ui/react";
import { BranchTable } from "../components/Branch/BranchTable";
import { SubBranch } from "../components/Branch/SubBranch";
import CustomModal from "../components/Modal";
import { BranchForm } from "../components/Branch/BranchForm";
export const BranchPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const handleSubmit = () => {
    if(onOpen){
      onOpen();
    }
  }
  return (
    <Box>
      <Grid
        templateAreas={`"MainBranch SubBranch"`}
        gridTemplateColumns={"2fr 1fr"}
      >
        <GridItem area={"MainBranch"}>
          <BranchTable />
        </GridItem>
        <GridItem area={"SubBranch"}>
          <SubBranch />
        </GridItem>
      </Grid>
      <IconButton
        colorScheme="green"
        aria-label="Add Branch"
        icon={<AddIcon />}
        isRound
        position={"fixed"}
        bottom={4}
        left={204}
        onClick={() => handleSubmit()}
      />
        <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <BranchForm isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  );
};
