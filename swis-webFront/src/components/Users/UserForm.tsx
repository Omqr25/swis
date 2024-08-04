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
import * as yup from "yup";
import User, { UserRequest } from "../../entities/User";
import useCreate from "../../hooks/useCreate";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis, AiOutlinePhone } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { Form } from "react-router-dom";
import useEdit from "../../hooks/useEdit";
import useGetOne from "../../hooks/useGetOne";

interface Props {
  ID: number;
  isEdit: boolean;
  type: string;
}

export const UserForm = ({ isEdit, ID, type }: Props) => {
  const target2 = type === "2" ? "users/indexKeeper" : "users/indexDonor";
  const Create = useCreate<User, FormData>("users", target2);

  const Edit = useEdit<User, FormData>(ID, "users", target2);

  const user = useGetOne<User>(ID, "users");

  const { t } = useTranslation();

  const [Image, setImage] = useState<File>();

  const validationsAddUser = yup.object().shape({
    name: yup
      .object()
      .shape({ en: yup.string().required("Name is required").min(4) }),
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

  const validationsEditUser = yup.object().shape({
    name: yup.object().shape({ en: yup.string().min(4) }),
    email: yup.string().email("Must be a valid email"),
    password: yup.string().min(8, "Password must be at least 8 characters"),
    contact_email: yup.string().email("Must be a valid email"),
    phone: yup.string(),
  });

  const handleSubmit = (values: UserRequest) => {
    const data = new FormData();
    values.name?.en ? data.append("name[en]", values.name?.en) : " ";
    values.email ? data.append("email", values.email) : " ";
    values.password ? data.append("password", values.password) : " ";
    values.contact_email
      ? data.append("contact_email", values.contact_email)
      : " ";
    values.phone ? data.append("phone", values.phone) : " ";
    Image ? data.append("photo", Image) : "";
    data.append("type", type);
    isEdit ? data.append("_method", "PUT") : "";
    isEdit ? Edit.mutate(data) : Create.mutate(data);
  };
  if (isEdit && user.isLoading) return <Text color={"white"}>Loading...</Text>;
  return (
    <Formik
      initialValues={{
        name: { en: isEdit ? user.data?.data.name : "" },
        email: "",
        password: "",
        phone: "",
        contact_email: "",
      }}
      validationSchema={isEdit ? validationsEditUser : validationsAddUser}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Form>
          <Text color={"red"}>
            {Create.error?.message || Edit.error?.message
              ? "Check Again your fields!"
              : ""}
          </Text>
          <Text color={"green"}>
            {Create.isSuccess || Edit.isSuccess ? "Done Successfully" : ""}
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
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <Button
            bgColor={isEdit ? "blue" : "green"}
            color={"white"}
            width="full"
            type="button"
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
