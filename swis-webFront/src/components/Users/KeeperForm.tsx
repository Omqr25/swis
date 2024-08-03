import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import * as yup from "yup";
import User, { UserRequest } from "../../entities/User";
import useCreate from "../../hooks/useCreate";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { Form } from "react-router-dom";

export const UserForm = () => {
  const Create = useCreate<User, UserRequest>("users");

  const { t } = useTranslation();

  const [Image, setImage] = useState<File>();

  const validationsAddUser = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    contact_email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    phone: yup.string().required("Phone is required"),
  });

  const handleAddUser = (values: UserRequest) => {
    console.log(values);
    Create.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
      contact_email: values.contact_email,
      phone: values.phone,
      photo: Image,
      type: 2
    });
  };
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        phone: "",
        contact_email:"",
      }}
      validationSchema={validationsAddUser}
      onSubmit={handleAddUser}
    >
      <Form>
        <Text>{Create.error?.message ? "Check Again your fields!" : ""}</Text>
        <Text color={"green"}>
          {Create.isSuccess ? "Done Successfully" : ""}
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
        <FormControl id="email">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Email")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdOutlineMail color="white" />}
            />
            <Field
              name="email"
               color="white"
              as={Input}
              type="email"
              placeholder="Email"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="email">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="password">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Password")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdLockOutline color="white" />}
            />
            <Field
              name="password"
               color="white"
              as={Input}
              type={"password"}
              placeholder="Password"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="password">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <FormControl id="contact_email">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Contact_Email")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdOutlineMail color="white" />}
            />
            <Field
              name="contact_email"
               color="white"
              as={Input}
              type="email"
              placeholder="Contact_Email"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>
          <ErrorMessage name="contact_email">
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
        <FormControl id="image">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Image")}{" "}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CgProfile color="white" size={"30px"} />}
            />
            <Input
              type="file"
              accept="image/*"
              placeholder="image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setImage(file);
                  console.log(file);
                }
              }}
              pt={1}
              border={"hidden"}
            />
          </InputGroup>
          <ErrorMessage name="image">
            {(msg) => <Text color="red.500">324{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <Button
          bgColor={"green"}
          color={"white"}
          width="full"
          type="submit"
          marginTop={5}
          borderRadius={"20"}
        >
          {t("Add")}
        </Button>
      </Form>
    </Formik>
  );
};
