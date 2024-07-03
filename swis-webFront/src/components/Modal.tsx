import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props{
    children: ReactNode | ReactNode[];
    buttonLabel: string;
    isOpen: boolean;
    onClose: () => void;
}
const CustomModal = ({ children, buttonLabel, isOpen , onClose } : Props) => {
  const {colorMode} = useColorMode();
  const colorr = colorMode === "light" ? "gray.700" : "#333333";
  return (
    
      <Modal isOpen={isOpen} size={{lg:'lg' , base:'md'}} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={colorr}>
          <ModalHeader color={'white'}>{buttonLabel}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          
        </ModalContent>
      </Modal>
    
  );
};

export default CustomModal;
