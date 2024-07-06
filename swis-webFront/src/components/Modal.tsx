import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";
import Mycolor ,{MyDarkColor} from "../constants";
import { useTranslation } from "react-i18next";
interface Props{
    children: ReactNode | ReactNode[];
    buttonLabel: string;
    isOpen: boolean;
    onClose: () => void;
}
const CustomModal = ({ children, buttonLabel, isOpen , onClose } : Props) => {
  const {colorMode} = useColorMode();
  const colorr = colorMode === "light" ? Mycolor : MyDarkColor;
  const {t} = useTranslation();
  return (
    
      <Modal isOpen={isOpen} size={{lg:'lg' , base:'md'}} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={colorr}>
          <ModalHeader color={'white'}>{t(buttonLabel)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          
        </ModalContent>
      </Modal>
    
  );
};

export default CustomModal;
