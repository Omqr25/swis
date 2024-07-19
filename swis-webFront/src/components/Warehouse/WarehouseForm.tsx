import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MdPlace, MdStorage } from "react-icons/md";
import * as yup from "yup";
import Branches from "../../entities/Branches";
import User from "../../entities/User";
import Warehouse from "../../entities/warehouse";
import Warehouse2 from "../../entities/warehouse2";
import useCreate from "../../hooks/useCreate";
import useEdit from "../../hooks/useEdit";
import useGetAll from "../../hooks/useGetAll";
import useGetOne from "../../hooks/useGetOne";
import useSub from "../../hooks/useSub";

interface Props {
  isEdit: boolean;
  ID: number;
}

export const WarehouseForm = ({ isEdit, ID }: Props) => {
  const Edit = useEdit<Warehouse, Warehouse2>(ID, "warehouses");

  const Create = useCreate<Warehouse, Warehouse2>("warehouses");

  const warehouse = useGetOne<Warehouse>(ID, "warehouses");

  const warehouses = useGetAll<Warehouse>("warehouses");

  const branches = useGetAll<Branches>("branches");

  const keepers = useGetAll<User>("users/indexKeeper");

  const [selectedMainBranch, setSelectedMainBranch] = useState<number | null>(
    null
  );

  const [branch_id, setBranch_Id] = useState<number>(0);

  const [warehouse_id, setWarehouse_Id] = useState<number>(0);

  const [user_id, setUser_Id] = useState<number>(0);

  const [is_Distribution_point, setis_Distribution_point] = useState(false);


  useEffect(() =>{
    if (isEdit) {
        if (warehouse.data?.data.branch?.id)
          setBranch_Id(warehouse.data?.data.branch?.id);
        if (warehouse.data?.data.main_Warehouse?.id) {
          setWarehouse_Id(warehouse.data?.data.main_Warehouse?.id);
        }
        keepers.data?.pages.map((page) =>
          page.data.map((ke) =>
            ke.name === warehouse.data?.data.keeper && ke.id
              ? setUser_Id(ke.id)
              : ""
          )
        );
      }
  },[warehouse.data?.data.branch?.id]);
  console.log(user_id);
  
  const subBranches = useSub<Branches>(
    Number(selectedMainBranch),
    "branches/indexSubBranch"
  );

  const { t } = useTranslation();

  const validationsEditWarehouse = yup
    .object()
    .shape({
      name: yup.string(),
      capacity: yup.number(),
      location: yup.object().shape({
        latitude: yup.number(),
        longitude: yup.number(),
      }),
    })
    .test(
      "at-least-one-required",
      "At least one field is required",
      function (value) {
        const { name, capacity, location } = value;
        const atLeastOneFieldHasValue =
          !!name || !!capacity || !!location.latitude || !!location.longitude;
        if (!atLeastOneFieldHasValue) {
          return this.createError({
            path: "name",
            message: "At least one field is required",
          });
        }
        return true;
      }
    );
  const validationsAddWarehouse = yup.object().shape({
    name: yup.string().required("Name is required"),
    capacity: yup.number().required("Capacity is required"),
    location: yup.object().shape({
      latitude: yup.number().required("Latitude is required"),
      longitude: yup.number().required("Longitude is required"),
    }),
  });

  const handleEditWarehouse = (values: Warehouse2) => {
    Edit.mutate({
      name: values.name,
      branch_id: branch_id,
      capacity: values.capacity,
      parent_id: warehouse_id,
      user_id: user_id,
      is_Distribution_point: is_Distribution_point,
      _method: "PUT",
    });
  };

  const handleAddWarehouse = (values: Warehouse2) => {
    console.log(branch_id);
    Create.mutate({
      name: values.name,
      branch_id: branch_id,
      capacity: values.capacity,
      parent_id: warehouse_id,
      user_id: user_id,
      location: {
        longitude: values.location?.longitude,
        latitude: values.location?.latitude,
      },
      is_Distribution_point: is_Distribution_point,
    });
  };

  const handleMainBranchChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMainBranch(Number(event.target.value));
    setBranch_Id(Number(event.target.value));
  };

  const handleSubBranchChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBranch_Id(Number(event.target.value));
  };

  const handleMainWarehouseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWarehouse_Id(Number(event.target.value));
  };

  const handleKeeperChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser_Id(Number(event.target.value));
  };

  if (isEdit && warehouse.isLoading)
    return <Text color={"white"}>Loading...</Text>;
  return (
    <Formik
      initialValues={{
        name: isEdit ? warehouse.data?.data.name : "",
        branch: 1,
        capacity: isEdit ? warehouse.data?.data.Free_capacity : 0,
        parent_id: 1,
        user_id: 1,
        location: { longitude: 0, latitude: 0 },
        is_Distribution_point: false,
      }}
      validationSchema={
        isEdit ? validationsEditWarehouse : validationsAddWarehouse
      }
      onSubmit={isEdit ? handleEditWarehouse : handleAddWarehouse}
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

        <FormControl id="capacity">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Capacity")}{" "}
          </FormLabel>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdStorage color="white" />}
            />

            <Field
              name="capacity"
              color="white"
              as={Input}
              type="number"
              placeholder="cpacity"
              _placeholder={{ color: "white" }}
              borderRadius={"20"}
              width={"full"}
              pl={"30px"}
            />
          </InputGroup>

          <ErrorMessage name="capacity">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>

        <FormControl id="parent_id">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("MainWarehouse")}{" "}
          </FormLabel>

          <Select
            placeholder="Select main warehouse"
            onChange={handleMainWarehouseChange}
            borderRadius={"20"}
            width={"full"}
            color="gray.400"
          >
            {warehouses.data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((wr) => (
                  <option key={wr.id} value={`${wr.id}`}>
                    {wr.name}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </Select>

          <ErrorMessage name="parent_id">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>

        <FormControl id="user_id">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Keeper")}{" "}
          </FormLabel>

          <Select
            placeholder="Select Keeper"
            onChange={handleKeeperChange}
            borderRadius={"20"}
            width={"full"}
            color="gray.400"
          >
            {keepers.data?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((ke) => (
                  <option key={ke.id} value={`${ke.id}`}>
                    {ke.name}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </Select>

          <ErrorMessage name="user_id">
            {(msg) => <Text color="red.500">{msg}</Text>}
          </ErrorMessage>
        </FormControl>
        <HStack>
          <FormControl id="longitude">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("Longitude")}{" "}
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<MdPlace color="white" />}
              />

              <Field
                name="location.longitude"
                color="white"
                as={Input}
                type="number"
                placeholder="longitude"
                _placeholder={{ color: "white" }}
                borderRadius={"20"}
                width={"200px"}
                pl={"30px"}
              />
            </InputGroup>

            <ErrorMessage name="location.longitude">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>

          <FormControl id="latitude">
            <FormLabel fontFamily={"cursive"} color={"white"}>
              {t("Latitude")}{" "}
            </FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<IoLocationSharp color="white" />}
              />

              <Field
                name="location.latitude"
                color="white"
                as={Input}
                type="number"
                placeholder="latitude"
                _placeholder={{ color: "white" }}
                borderRadius={"20"}
                width={"200px"}
                pl={"30px"}
              />
            </InputGroup>

            <ErrorMessage name="location.latitude">
              {(msg) => <Text color="red.500">{msg}</Text>}
            </ErrorMessage>
          </FormControl>
        </HStack>
        <FormControl id="iDistribution_point">
          <FormLabel fontFamily={"cursive"} color={"white"}>
            {t("Distribution_point")}{" "}
          </FormLabel>

          <Select
            placeholder="Distribution_point"
            onChange={(e) => setis_Distribution_point(Boolean(e.target.value))}
            borderRadius={"20"}
            width={"full"}
            color="gray.400"
          >
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </Select>

          <ErrorMessage name="Distribution_point">
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
