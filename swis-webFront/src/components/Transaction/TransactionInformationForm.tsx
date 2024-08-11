import { CalendarIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CgNotes, CgProfile } from "react-icons/cg";
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Transaction, { TransactionRequest } from "../../entities/Transactions";
import useCreate from "../../hooks/useCreate";
import useCreateTransactionStore from "../../stores/createTransactionStroe";

export const TransactionInformationForm = () => {
  const Create = useCreate<Transaction, FormData>("transactions");

  const navigate = useNavigate();

  const { t } = useTranslation();

  const [Waybill_img, setWaybill_img] = useState<File>();

  const [Isconvoy, setIsconvoy] = useState("");

  const [Transaction_type, setTransaction_type] = useState("");

  const [Type, setType] = useState("");

  const { Items } = useCreateTransactionStore();

  const { Drivers } = useCreateTransactionStore();

  const { UserId } = useCreateTransactionStore();

  const { colorMode } = useColorMode();
  const Color = colorMode === "dark" ? "white" : "black";

  const validationsAdd = yup.object().shape({
    notes: yup.object().shape({ en: yup.string() }),
    date: yup.date().required("Date is required"),
    waybill_num: yup.number().required("Bill Number is required"),
    CNT: yup.string(),
  });

  const handleSubmit = (values: TransactionRequest) => {
    const data = new FormData();
    values.notes?.en ? data.append("notes[en]", values.notes?.en) : "";
    data.append("status", "2");
    if (Items) {  
      Items.forEach((item,index) => {  
          data.append(`items[${index}][item_id]`, JSON.stringify(item.item_id));
          data.append(`items[${index}][warehouse_id]`, JSON.stringify(item.warehouse_id));
          data.append(`items[${index}][quantity]`, JSON.stringify(item.quantity));
      });  
  }
    if (Drivers) Drivers.forEach(driver => {  
      data.append("drivers[]", JSON.stringify(driver));
  }); 
    values.date ? data.append("date", values.date) : "";
    values.waybill_num
      ? data.append("waybill_num", `${values.waybill_num}`)
      : "";
    values.CTN ? data.append("CTN", `${values.CTN}`) : "";
    Waybill_img ? data.append("waybill_img", Waybill_img) : "";
    UserId ? data.append("user_id", `${UserId}`) : "";
    Transaction_type ? data.append("transaction_type", Transaction_type) : "";
    Type ? data.append("type", Type) : "";
    Isconvoy ? data.append("is_convoy", Isconvoy) : "";
    console.log(UserId);
    Create.mutate(data);
  };

  if(Create.isSuccess){
    navigate('/Transactions');
  }
  return (
    <Formik
      initialValues={{}}
      validationSchema={validationsAdd}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Form>
          <Text color={"red"}>
            {Create.error?.message ? Create.error?.message : ""}
          </Text>
          <FormControl id="notes">
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("notes")}{" "}
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CgNotes color={Color} />}
              />

              <Field
                name="notes.en"
                color={Color}
                as={Input}
                type="text"
                placeholder="Write Your Notes"
                _placeholder={{ color: Color }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="notes.en">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="date" isRequired>
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("Date")}{" "}
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CalendarIcon color={Color} />}
              />

              <Field
                name="date"
                color={Color}
                as={Input}
                type="date"
                placeholder="Write Your Notes"
                _placeholder={{ color: Color }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="date">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="waybill_num" isRequired>
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("Waybill_num")}{" "}
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaFileInvoice color={Color} />}
              />

              <Field
                name="waybill_num"
                color={Color}
                as={Input}
                type="number"
                placeholder="Bill Number"
                _placeholder={{ color: Color }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="waybill_num">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="waybill_img" isRequired>
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("Waybill_img")}{" "}
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
                    setWaybill_img(file);
                  }
                }}
                pt={1}
                borderRadius={20}
              />
            </InputGroup>
            <ErrorMessage name="waybill_img">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="is_convoy" isRequired>
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("is_convoy")}{" "}
            </FormLabel>
            <InputGroup>
              <RadioGroup onChange={setIsconvoy} w={"full"} color={Color}>
                <Radio size={{ lg: "lg", md: "md" }} value={"1"} p={2}>
                  YES
                </Radio>
                <Radio size={{ lg: "lg", md: "md" }} value="0" p={2}>
                  NO
                </Radio>
              </RadioGroup>
            </InputGroup>
            <ErrorMessage name="is_convoy">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="transaction_type" isRequired>
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("Transaction_type")}{" "}
            </FormLabel>
            <InputGroup>
              <RadioGroup
                onChange={setTransaction_type}
                w={"full"}
                color={Color}
              >
                <Radio size={{ lg: "lg", md: "md" }} value={"1"} p={2}>
                  IN
                </Radio>
                <Radio size={{ lg: "lg", md: "md" }} value={"2"} p={2}>
                  OUT
                </Radio>
              </RadioGroup>
            </InputGroup>
            <ErrorMessage name="transaction_type">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="type" isRequired>
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("type")}{" "}
            </FormLabel>
            <InputGroup>
              <RadioGroup onChange={setType} w={"full"} color={Color}>
                <Radio size={{ lg: "lg", md: "md" }} value={"1"} p={2}>
                  IN
                </Radio>
                <Radio size={{ lg: "lg", md: "md" }} value={"2"} p={2}>
                  OUT
                </Radio>
              </RadioGroup>
            </InputGroup>
            <ErrorMessage name="type">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <FormControl id="CTN">
            <FormLabel fontFamily={"cursive"} color={Color}>
              {t("CTN")}{" "}
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<CgNotes color={Color} />}
              />

              <Field
                name="CTN"
                color={Color}
                as={Input}
                type="Ctn"
                placeholder="CTN"
                _placeholder={{ color: Color }}
                borderRadius={"20"}
                width={"full"}
                pl={"30px"}
              />
            </InputGroup>
            <ErrorMessage name="CTN">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
          <Button
            bgColor={"green"}
            color={"white"}
            width="full"
            type="submit"
            marginTop={5}
            borderRadius={"20"}
            onClick={submitForm}
          >
            {t("Submit")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
