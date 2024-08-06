import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis } from "react-icons/ai";
import { CgSize } from "react-icons/cg";
import { FaWeight } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Form } from "react-router-dom";
import * as yup from "yup";
import item, { itemRequest } from "../../entities/items";
import useCreate from "../../hooks/useCreate";
import useEdit from "../../hooks/useEdit";
import useGetOne from "../../hooks/useGetOne";
import { SelectSector } from "./SelectSector";
import { SelectUnit } from "./SelectUnit";

interface Props {
  isEdit: boolean;
  ID: number;
}

export const ProductForm = ({ isEdit, ID }: Props) => {
  const Create = useCreate<item, FormData>("items", "items");

  const Edit = useEdit<item, FormData>(ID, "items", "items");

  const item = useGetOne<item>(ID, "items");

  const [sectorType , setSectorType] = useState<string>("");

  const [unitType , setUnitType] = useState<string>("");

  const selectSector = (sector : string) => {
    setSectorType(sector);
  }
  const selectUnit = (unit : string) => {
    setUnitType(unit);
  }

  const { t } = useTranslation();

  const validationsEditItem = yup
    .object()
    .shape({
      name: yup.object().shape({ en: yup.string().min(4) }),
      quantity: yup.number().min(1),
      weight: yup.number().min(1),
      size: yup.number().min(1),
    })
    .test(
      "at-least-one-required",
      "At least one field is required",
      function (value) {
        const { name, quantity, weight, size } = value;
        const atLeastOneFieldHasValue =
          !!name || !!quantity || !!weight || !!size;
        if (!atLeastOneFieldHasValue) {
          return this.createError({
            path: "name",
            message: "At least one field is required",
          });
        }
        return true;
      }
    );
  const validationsAddItem = yup.object().shape({
    name: yup
      .object()
      .shape({ en: yup.string().required("Name is required").min(4) }),
    quantity: yup.number().min(1).required("quantity is required"),
    weight: yup.number().min(1).required("weight is required"),
    size: yup.number().min(1).required("size is required"),
  });
  const handleSubmit = (values: itemRequest) => {
    const data = new FormData();
    values.name?.en ? data.append("name[en]", values.name.en) : "";
    values.quantity ? data.append("quantity", String(values.quantity)) : 0;
    values.size ? data.append("size", String(values.size)) : 0;
    values.weight ? data.append("weight", String(values.weight)) : 0;
    sectorType ? 
       data.append("sectorType", sectorType)
      : "";
    unitType ? data.append("unitType", unitType) : "";
    isEdit ? data.append("_method", "PUT") : "";
    isEdit ? Edit.mutate(data) : Create.mutate(data);
  };
  if (isEdit && item.isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <Formik
      initialValues={{
        name: { en: isEdit ? item.data?.data.name : "" },
        size: isEdit ? item.data?.data.size : 0,
        weight: isEdit ? item.data?.data.weight : 0,
        quantity: isEdit ? item.data?.data["quantity in the system"] : 0,
      }}
      validationSchema={isEdit ? validationsEditItem : validationsAddItem}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Form>
          <Text color={"red"}>
            {Edit.error?.message ? Edit.error.message : ""}
          </Text>
          <Text color={"red"}>
            {Create.error?.message ? Create.error?.message : ""}
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
                type="text"
                placeholder="name"
                _placeholder={{ color: "white" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="name.en">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="sector">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("sectorType")}{" "}
            </FormLabel>
            <SelectSector selectSector={selectSector}/>
            <ErrorMessage name="sector">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="unit">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("unitType")}{" "}
            </FormLabel>
            <SelectUnit selectUnit={selectUnit}/>
            <ErrorMessage name="unit">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="size">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("Size")}{" "}
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CgSize color="white" />}
              />

              <Field
                name="size"
                color="white"
                as={Input}
                type="number"
                placeholder="Size"
                _placeholder={{ color: "white" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>

            <ErrorMessage name="size">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="weight">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("Weight")}{" "}
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaWeight color="white" />}
              />

              <Field
                name="weight"
                color="white"
                as={Input}
                type="number"
                placeholder="Weight"
                _placeholder={{ color: "white" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>

            <ErrorMessage name="weight">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="quantity">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("quantity")}{" "}
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdProductionQuantityLimits color="white" />}
              />

              <Field
                name="quantity"
                color="white"
                as={Input}
                type="number"
                placeholder="Quantity"
                _placeholder={{ color: "white" }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>

            <ErrorMessage name="size">
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
            onClick={submitForm}
          >
            {isEdit ? t("Edit") : t("Add")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
