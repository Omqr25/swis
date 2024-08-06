import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
  CloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useDelete from "../hooks/useDelete";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";

interface Props {
  ID: number;
  target: string;
  type: string;
  target2? : string;
  showText? : boolean;
}

function DeleteC({ ID, target , type , target2 , showText = true}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const Delete = useDelete(ID, target , target2);
  const handleDelete = () => {
    Delete.mutate({
      _method: "DELETE",
    });
  };
  const { t } = useTranslation();
  if (Delete.isLoading) {
    if (isOpen == true) onClose();
    return <Spinner />;
  }
  return (
    <>
      {type === "Button" && (
    
        <Button
        leftIcon={<FaTrash/>} 
          colorScheme="red"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          {showText ? t("Delete") : ""}
        </Button>
      )}
      {type != "Button" && (
        <CloseButton
          position="absolute"
          top="8px"
          right="8px"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          _hover={{
            bg: "red.500",
          }}
        />
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("DItem")}
            </AlertDialogHeader>

            <AlertDialogBody>{t("DMess")}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                {t("Delete")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default DeleteC;
