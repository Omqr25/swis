import { ErrorMessage, Field, Form, Formik } from "formik";
import Driver, { DriverRequest } from "../../entities/Drivers";
import useCreate from "../../hooks/useCreate";
import useEdit from "../../hooks/useEdit";
import useGetOne from "../../hooks/useGetOne";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { useTranslation } from "react-i18next";

interface Props {
  isEdit: boolean;
  ID: number;
}

export const DriverForm = ({ isEdit, ID }: Props) => {
  const Create = useCreate<Driver, FormData>("drivers");

  const Edit = useEdit<Driver, FormData>(ID, "drivers");

  const driver = useGetOne<Driver>(ID, "drivers");

  const { t } = useTranslation();

  const validationsEditDriver = yup
    .object()
    .shape({
      name: yup.object().shape({ en: yup.string().min(4) }),
      phone: yup.string(),
      vehicle_number: yup.string(),
      national_id: yup.string(),
      transportation_company_name: yup
        .object()
        .shape({ en: yup.string().min(4) }),
    })
    .test(
      "at-least-one-required",
      "At least one field is required",
      function (value) {
        const {
          name,
          phone,
          vehicle_number,
          national_id,
          transportation_company_name,
        } = value;
        const atLeastOneFieldHasValue =
          !!name ||
          !!phone ||
          !!vehicle_number ||
          !!national_id ||
          !!transportation_company_name;
        if (!atLeastOneFieldHasValue) {
          return this.createError({
            path: "name",
            message: "At least one field is required",
          });
        }
        return true;
      }
    );

  const validationsAddDriver = yup.object().shape({
    name: yup
      .object()
      .shape({ en: yup.string().required("Name is required").min(4) }),
    phone: yup.string().required("Phone is required"),
    vehicle_number: yup.string().required("vehicle_number is required"),
    national_id: yup.string().required("national_id is required"),
    transportation_company_name: yup
      .object()
      .shape({ en: yup.string().min(4).required("transportation_company_name is required") }),
  });

  const handleSubmit = (values: DriverRequest) => {
    const data = new FormData();
    values.name?.en ? data.append("name[en]", values.name.en) : "";
    values.phone ? data.append("phone", values.phone) : "";
    values.vehicle_number  ? data.append("vehicle_number", values.vehicle_number) : "";
    values.national_id ? data.append("national_id", values.national_id) : "";
    values.transportation_company_name?.en ? data.append("transportation_company_name[en]",
      values.transportation_company_name.en): "";
    isEdit ? data.append("_method", "PUT") : "";
    isEdit ? Edit.mutate(data) : Create.mutate(data);
  };
  if (isEdit && driver.isLoading)
    return <Text color={"white"}>Loading...</Text>;
  return (
    <Formik
      initialValues={{
        name: { en: isEdit ? driver.data?.data.name : "" },
        phone: "",
        vehicle_number: isEdit ? driver.data?.data.vehicle_number : "",
        national_id: isEdit ? driver.data?.data.national_id : "",
        transportation_company_name: {
          en: isEdit ? driver.data?.data.transportation_company_name : "",
        },
      }}
      validationSchema={isEdit ? validationsEditDriver : validationsAddDriver}
      onSubmit={handleSubmit}
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
              type="text"
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
              type="text"
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
        <FormControl id="vehicle_number">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("vehicle_number")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlinePhone color="white" />}
            />
            <Field
              name="vehicle_number"
              color="white"
              as={Input}
              type="text"
              placeholder="vehicle_number"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="vehicle_number">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="national_id">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("national_id")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlinePhone color="white" />}
            />
            <Field
              name="national_id"
              color="white"
              as={Input}
              type="text"
              placeholder="national_id"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="national_id">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="transportation_company_name">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("transportation_company_name")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlinePhone color="white" />}
            />
            <Field
              name="transportation_company_name.en"
              color="white"
              as={Input}
              type="text"
              placeholder="transportation_company_name"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="transportation_company_name">
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
