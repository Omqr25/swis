import { Box, useDisclosure } from "@chakra-ui/react"
import { DriverTable } from "../components/Driver/DriverTable"
import { AddButton } from "../components/AddButton"
import CustomModal from "../components/Modal"
import { DriverForm } from "../components/Driver/DriverForm"

export const DriverPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
    <DriverTable />
    <AddButton onOpen={onOpen} />
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <DriverForm isEdit={false} ID={1} />
      </CustomModal>
    </Box>
  )
}
