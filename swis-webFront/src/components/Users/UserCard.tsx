import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCode, FaEdit, FaEllipsisH, FaUser } from "react-icons/fa";
import User from "../../entities/User";
import CustomModal from "../Modal";

import { useTranslation } from "react-i18next";
import DeleteC from "../Delete";
import { UserForm } from "./UserForm";
import { UserInfo } from "./UserInfo";
interface Props {
  user: User;
  type: string;
}

export const UserCard = ({ user , type }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userId, setUserId] = useState<number>(1);

  const [label, setLabel] = useState<string>("");
  const handleSubmit = (id: number) => {
    if (onOpen) {
      onOpen();
      setLabel("Edit");
      setUserId(id);
    }
  };

  const handleCradClick = () => {
    if (onOpen) {
      onOpen();
      setLabel("User Info");
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
        onClick={handleCradClick}
      >
        <CardBody>
          <Image
            src={user.photo}
            alt={"User Photo"}
            borderRadius={"10%"}
            boxSize={"250px"}
            fallbackSrc="https://via.placeholder.com/200"
          />
          <Heading fontSize="md">
            <VStack m={1}>
              <HStack>
                <Icon as={FaUser} mr={1} />
                <Text color={"gray.600"}> {user.name}</Text>
              </HStack>
              <HStack>
                <Icon as={FaCode} mr={1} />
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
              onClick={(e) => {
                e.stopPropagation();
                handleMenuToggle();
              }}
            >
              <FaEllipsisH />
            </MenuButton>
            <MenuList p={2}>
              <VStack alignItems={'flex-start'}>
              <Button
                leftIcon={<FaEdit />}
                colorScheme="blue"
                onClick={(e) => {
                  e.stopPropagation();
                  user.id ? handleSubmit(user.id) : "";
                }}
              >
                {t("Edit")}
              </Button>
              {user.id && <DeleteC ID={user.id} target="users" type="Button" target2={type === "2" ? "users/indexKeeper" : "users/indexDonor"}/>}
              </VStack>
            </MenuList>
          </Menu>
        </CardBody>
      </Card>
      <CustomModal buttonLabel={label} isOpen={isOpen} onClose={onClose}>
        {label === "Edit" ? (
          <UserForm type={type} isEdit={true} ID={userId} />
        ) : (
          <UserInfo User={user} />
        )}
      </CustomModal>
    </Box>
  );
};
