import { Box, useDisclosure } from "@chakra-ui/react";
import { UserGrid } from "../components/Users/UserGrid"
import { AddButton } from "../components/AddButton";
import CustomModal from "../components/Modal";
import { UserForm } from "../components/Users/UserForm";

export const DonorPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <UserGrid target="users/indexDonor" />
      <AddButton onOpen={onOpen} />
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <UserForm type="3" isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  );
}