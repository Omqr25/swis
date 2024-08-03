import { Box, useDisclosure } from "@chakra-ui/react";
import { UserGrid } from "../components/Users/UserGrid";
import { AddButton } from "../components/AddButton";
import CustomModal from "../components/Modal";
import { UserForm } from "../components/Users/KeeperForm";

export const KeeperPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <UserGrid target="users/indexKeeper" />
      <AddButton onOpen={onOpen} />
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <UserForm />
      </CustomModal>
    </Box>
  );
};