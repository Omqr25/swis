import {
  Card,
  CardBody,
  Image,
  Heading,
  VStack,
  HStack,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { FaUser, FaCode, FaEllipsisH, FaTrash, FaEdit } from "react-icons/fa";
import User from "../../entities/User";
import { useState } from "react";
import CustomModal from "../Modal";

import { UserForm } from "./KeeperForm";
interface Props {
  user: User;
}

export const UserCard = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    if (onOpen) {
      onOpen();
    }
  };

  return (
    <Box>
      <Card
        borderRadius={10}
        overflow={"hidden"}
        size="md"
        position={"relative"}
        _hover={{
          transform: "scale(1.1)",
          transition: "transform .15s ease-in",
        }}
      >
        <CardBody>
          <Image
            src={user.photo}
            alt={"User Photo"}
            borderRadius={"10%"}
            boxSize={'250px'}
            fallbackSrc="https://via.placeholder.com/200"
          />
          <Heading fontSize="md">
            <VStack m={1}>
              <HStack>
                <Icon as={FaUser} mr={1} />
                <Text>Name :</Text>
                <Text color={"gray.600"}> {user.name}</Text>
              </HStack>
              <HStack>
                <Icon as={FaCode} mr={1} />
                <Text>Code :</Text>
                <Text color={"gray.600"}> {user.code}</Text>
              </HStack>
            </VStack>
          </Heading>
          <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <MenuButton
              as="button"
              position="absolute"
              top={2}
              right={2}
              cursor="pointer"
              onClick={handleMenuToggle}
            >
              <FaEllipsisH />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaEdit />} onClick={() => handleSubmit()}>
                Edit
              </MenuItem>
              <MenuItem icon={<FaTrash />} onClick={() => {}}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </CardBody>
      </Card>
      <CustomModal buttonLabel={"Add"} isOpen={isOpen} onClose={onClose}>
        <UserForm />
      </CustomModal>
    </Box>
  );
};
