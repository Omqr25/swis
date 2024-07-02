import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Spinner } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useDelete from "../hooks/useDelete";

interface Props{
    ID : number;
    target : string;
}

function DeleteC({ID , target} : Props) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const Delete = useDelete(ID , target);
  const handleDelete = () => {
    Delete.mutate({
        _method : 'DELETE',
    });
  };
  if(Delete.isLoading){
    if(isOpen == true)onClose();
    return <Spinner />}
  return (
    <>
      <Button colorScheme="red" onClick={(e) => {e.stopPropagation();setIsOpen(true);}}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this item?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default DeleteC;
