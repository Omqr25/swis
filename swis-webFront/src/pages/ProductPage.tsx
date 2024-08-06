import { Box, useDisclosure } from "@chakra-ui/react";
import { ProductGrid } from "../components/Product/ProductGrid";
import { AddButton } from "../components/AddButton";
import CustomModal from "../components/Modal";
import { ProductForm } from "../components/Product/ProductForm";

export const ProductPage = () => {
    const {isOpen , onOpen , onClose} = useDisclosure();
  return(
    <Box>
   <ProductGrid />
   <AddButton onOpen={onOpen} />
   <CustomModal buttonLabel={"Add"}  onClose={onClose} isOpen={isOpen}>
    <ProductForm isEdit={false} ID={1} />
   </CustomModal>
   </Box>
  );
};
