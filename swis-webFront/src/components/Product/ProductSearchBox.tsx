import {
    Box,
    Button,
    Icon,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BiBuilding, BiUnite } from "react-icons/bi";
import { CgSize } from "react-icons/cg";
import { FaCode, FaEdit, FaWeight } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { itemSearch } from "../../entities/items";
import DeleteC from "../Delete";
import CustomModal from "../Modal";
import { ProductForm } from "./ProductForm";
  
  interface Props {
    product: itemSearch;
  }
  export const ProductSearchBox = ({ product }: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
  
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  
    const [itemId, setItemId] = useState(0);
  
    const handleSubmit = (id: number) => {
      if (onOpen) {
        onOpen();
        setItemId(id);
      }
    };
    const { t } = useTranslation();
    return (
      <Box
        position="relative"
        borderWidth="1px"
        borderRadius="md"
        p="16"
        backgroundColor="gray.300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        transition="background-color 0.3s ease"
        _hover={{ cursor: "pointer", bg: "gray.500" }}
      >
        <Text position="absolute" left={40} top={0} m={1} fontSize="xl">
          <Icon as={AiOutlineEllipsis} mr={1} /> <b> {product.name?.en}</b>
        </Text>
        <Box
          position="absolute"
          left={0}
          top={5}
          opacity={isHovered ? 0 : 1}
          m={2}
          transition="opacity 0.3s ease"
        >
          <Text>
            <Icon as={FaCode} mr={1} /> <b>{t("Code")} :</b> {product.code}
          </Text>
          <Text>
            <Icon as={MdProductionQuantityLimits} mr={1} />{" "}
            <b>{t("quantity")} :</b> {product.quantity}
          </Text>
        </Box>
        <Box
          position="absolute"
          left={0}
          top={5}
          m={2}
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
        >
          <Text>
            <Icon as={BiBuilding} mr={1} /> <b>{t("sectorType")} :</b>{" "}
            {product.sectorType}
          </Text>
          <Text>
            <Icon as={BiUnite} mr={1} /> <b>{t("unitType")} :</b>{" "}
            {product.unitType}
          </Text>
          <Text>
            <Icon as={CgSize} mr={1} /> <b>{t("Size")} :</b> {product.size}
          </Text>
          <Text>
            <Icon as={FaWeight} mr={1} /> <b>{t("Weight")} :</b> {product.weight}
          </Text>
        </Box>
        <VStack position={"absolute"} right={2} top={5}>
          <Button
            colorScheme="blue"
            onClick={(e) => {
              e.stopPropagation();
              product.id ? handleSubmit(product.id) : "";
            }}
          >
            <Icon as={FaEdit} />
          </Button>
          {product.id && (
            <DeleteC
              target="items"
              target2="items"
              type="Button"
              ID={product.id}
              showText={false}
            />
          )}
        </VStack>
        <CustomModal buttonLabel="Edit" onClose={onClose} isOpen={isOpen}>
          <ProductForm isEdit={true} ID={itemId} />
        </CustomModal>
      </Box>
    );
  };
  