import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import * as yup from "yup";
import Branches from "../../entities/Branches";
import Branches2 from "../../entities/Branches2";
import useCreate from "../../hooks/useCreate";
import useEdit from "../../hooks/useEdit";
import useGetAll from "../../hooks/useGetAll";
import useGetOne from "../../hooks/useGetOne";
import useSub from "../../hooks/useSub";

interface Props {
  isEdit: boolean;
  ID: number;
}
export const BranchForm = ({ isEdit, ID }: Props) => {
  const { t } = useTranslation();

  const branches = useGetAll<Branches>("branches/indexMainBranch");

  const [selectedMainBranch, setSelectedMainBranch] = useState<number | null>(
    null
  );

  const [branch_id, setBranch_Id] = useState<number | null>(null);

  const subBranches = useSub<Branches>(
    Number(selectedMainBranch),
    "branches/indexSubBranch"
  );

  const validationsEditBranch = yup
    .object()
    .shape({
      name: yup.object().shape({en : yup.string().min(4)}),
      phone: yup.string(),
      address: yup.object().shape({en : yup.string()})
    })
    .test(
      "at-least-one-required",
      "At least one field is required",
      function (value) {
        const { name, phone, address } = value;
        const atLeastOneFieldHasValue = !!name || !!phone || !!address;

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
    name: yup.object().shape({en : yup.string().required("Name is required").min(4)}),
    phone: yup.string().required("Phone is required"),
    address: yup.object().shape({en : yup.string().required("Name is required")}),
  });

  const Edit = useEdit<Branches, Branches2>(ID, "branches");
  const Create = useCreate<Branches, Branches2>("branches");
  const branch = useGetOne<Branches>(ID, "branches");
  useEffect(() => {
    if (isEdit && branch.data?.data.main_branch?.id)
      setBranch_Id(branch.data?.data.main_branch?.id);
  }, [branch.data?.data.main_branch?.id]);
  const handleEditBranch = (values: Branches2) => {
    if (values.phone)
      Edit.mutate({
        name: {en:values.name?.en},
        address: {en:values.address?.en},
        phone: values.phone,
        parent_id: branch_id,
        _method: "PUT",
      });
    else
      Edit.mutate({
        name: {en:values.name?.en},
        address: {en:values.address?.en},
        parent_id: branch_id,
        _method: "PUT",
      });
  };
  const handleAddBranch = (values: Branches2) => {
    console.log(values.name);
    Create.mutate({
      name: {en:values.name?.en},
      phone: values.phone,
      address: {en:values.address?.en},
      parent_id: branch_id,
    });
  };

  const handleMainBranchChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if(!event.target.value){
    setBranch_Id(null);
    }else{
    setSelectedMainBranch(Number(event.target.value));
    setBranch_Id(Number(event.target.value));
  }
  };

  const handleSubBranchChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBranch_Id(Number(event.target.value));
  };

  if (isEdit && branch.isLoading)
    return <Text color={"white"}>Loading...</Text>;
  return (
    <Formik
      initialValues={{
        name: {en : isEdit ? branch.data?.data.name : ""
        },
        code: isEdit ? branch.data?.data.code : "",
        phone: "",
        address: {en : isEdit ? branch.data?.data.address : ""}
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
              name="name.en"
              color="white"
              as={Input}
              type="name"
              placeholder="name"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
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
              width={"full"}
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
              name="address.en"
              color="white"
              as={Input}
              type="text"
              placeholder="address"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="address">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="branch">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Branch")}{" "}
          </FormLabel>

          <Select
            placeholder="Select main branch"
            onChange={handleMainBranchChange}
            borderRadius={"20"}
            width={"full"}
            color="gray.400"
          >
            <option value={"self"}></option>
            {branches.data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((br) => (
                  <option key={br.id} value={br.id}>
                    {br.name}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </Select>

          <Select
            placeholder="Select sub branch"
            onChange={handleSubBranchChange}
            isDisabled={!selectedMainBranch}
            color="gray.400"
            pt={2}
            borderRadius={"20"}
            width={"full"}
          >
            {subBranches.data?.data.map((br) => (
              <option key={br.id} value={br.id}>
                {br.name}
              </option>
            ))}
          </Select>

          <ErrorMessage name="branch">
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
