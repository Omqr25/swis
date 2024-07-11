import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { BiDice6, BiMap } from "react-icons/bi";
import * as yup from "yup";
import Branches2 from "../../entities/Branches2";
import useGetOne from "../../hooks/useGetOne";
import useEdit from "../../hooks/useEdit";
import useCreate from "../../hooks/useCreate";
import { useTranslation } from "react-i18next";
import Branches from "../../entities/Branches";

interface Props {
  isEdit: boolean;
  ID: number;
}
export const BranchForm = ({ isEdit, ID }: Props) => {
  const { t } = useTranslation();
  const validationsEditBranch = yup
    .object()
    .shape({
      name: yup.string(),
      phone: yup.string(),
      address: yup.string(),
      parent_id: yup.string(),
    })
    .test(
      "at-least-one-required",
      "At least one field is required",
      function (value) {
        const { name, phone, address, parent_id } = value;
        const atLeastOneFieldHasValue =
          !!name || !!phone || !!address || !!parent_id;

        if (!atLeastOneFieldHasValue) {
          return this.createError({
            path: "name",
            message: "At least one field is required",
          });
        }

        return true;
      }
    );
  const validationsAddBranch = yup.object().shape({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("address is required"),
    parent_id: yup.string().required("Main Branch Id is required"),
  });

  const Edit = useEdit<Branches,Branches2>(ID , "branches");
  const Create = useCreate<Branches, Branches2>("branches");
  const branch = useGetOne<Branches>(ID, "branches");
  const handleEditBranch = (values: Branches2) => {
    if (values.phone)
      Edit.mutate({
        name: values.name,
        phone: values.phone,
        address: values.address,
        parent_id: values.parent_id,
        _method: "PUT",
      });
    else
      Edit.mutate({
        name: values.name,
        address: values.address,
        parent_id: values.parent_id,
        _method: "PUT",
      });
  };
  const handleAddBranch = (values: Branches2) => {
    console.log(values.name);
    Create.mutate({
      name: values.name,
      phone: values.phone,
      address: values.address,
      parent_id: values.parent_id,
    });
  };
  if (isEdit && branch.isLoading)
    return <Text color={"white"}>Loading...</Text>;
  return (
    <Formik
      initialValues={{
        name: isEdit ? branch.data?.data.name : "",
        code: isEdit ? branch.data?.data.code : "",
        phone: "",
        address: isEdit ? branch.data?.data.address : "",
        parent_id: isEdit ? branch.data?.data.main_branch?.id : 1,
      }}
      validationSchema={isEdit ? validationsEditBranch : validationsAddBranch}
      onSubmit={isEdit ? handleEditBranch : handleAddBranch}
    >
      <Form>
        <Text color={"red"}>
          {Edit.error?.message || Create.error?.message
            ? "Check Again your fields!"
            : ""}
        </Text>
        <Text color={"green"}>
          {Edit.isSuccess || Create.isSuccess ? "Done Successfully" : ""}
        </Text>
        <FormControl id="name">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Name")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineEllipsis color="white" />}
            />
            <Field
              name="name"
              color="white"
              as={Input}
              type="name"
              placeholder="name"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={{ base: "100px", lg: "400px" }}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="name">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="phone">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Phone")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlinePhone color="white" />}
            />
            <Field
              name="phone"
              color="white"
              as={Input}
              type="phone"
              placeholder="0000000000"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={{ base: "100px", lg: "400px" }}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="phone">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="address">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Address")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiMap color="white" />}
            />
            <Field
              name="address"
              color="white"
              as={Input}
              type="address"
              placeholder="address"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={{ base: "100px", lg: "400px" }}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="address">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="parent_id">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("MainBranch_id")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiDice6 color="white" />}
            />
            <Field
              name="parent_id"
              color="white"
              as={Input}
              type="parent_id"
              placeholder="MainBranch_id"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={{ base: "100px", lg: "400px" }}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="parent_id">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <Button
          bgColor={isEdit ? "blue.500" : "green"}
          color={"white"}
          width="full"
          type="submit"
          marginTop={5}
          borderRadius={"20"}
        >
          {isEdit ? t("Edit") : t("Add")}
        </Button>
      </Form>
    </Formik>
  );
};
