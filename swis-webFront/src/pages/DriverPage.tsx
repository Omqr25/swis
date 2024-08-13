import { Box, useDisclosure } from "@chakra-ui/react"
import { DriverTable } from "../components/Driver/DriverTable"
import { AddButton } from "../components/AddButton"
import CustomModal from "../components/Modal"
import { DriverForm } from "../components/Driver/DriverForm"
import { useLocation } from "react-router-dom"
import DriverSearchTable from "../components/Driver/DriverSearchTable"

export const DriverPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const currentPath = location.pathname; 

  const Search = currentPath.includes("Search");

  return (
    <Box>
    {Search ? <DriverSearchTable />:<DriverTable />}
    <AddButton onOpen={onOpen} />
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <DriverForm isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  )
}
