import { Box, useDisclosure } from "@chakra-ui/react";
import { UserGrid } from "../components/Users/UserGrid";
import { AddButton } from "../components/AddButton";
import CustomModal from "../components/Modal";
import { UserForm } from "../components/Users/UserForm";
import { useLocation } from "react-router-dom";
import UserSearchGrid from "../components/Users/UserSearchGrid";

export const KeeperPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const currentPath = location.pathname; 

  const Search = currentPath.includes("Search");
  return (
    <Box>
      {Search ? <UserSearchGrid />: <UserGrid target="users/indexKeeper" />}
      <AddButton onOpen={onOpen} />
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <UserForm type="2" isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  );
};
