import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import resizeWindow from "../resizeWindow";
import useSearchStore from "../stores/SearchStore";
interface Search {
  text: string;
}
export const SearchInput = () => {
  const handleSearch = (vlaues: Search) => {
    console.log(vlaues.text);
  };

  const { width } = resizeWindow();

  const [value, setValue] = useState(localStorage.getItem("currentPage"));

  const navigate = useNavigate();

  const { setData } = useSearchStore();

  useEffect(() => {
    const handleStorageChange = () => {
      setValue(localStorage.getItem("currentPage"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Formik initialValues={{ text: "" }} onSubmit={handleSearch}>
      <Form>
        <Box bgColor={"gray"} borderRadius={20}>
          <FormControl id="text">
            {
              <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                  name="text"
                  as={Input}
                  borderRadius={20}
                  width={{ lg: (width * 2) / 3, base: (width * 1) / 3 }}
                  placeholder={
                    `Search about ` +
                    (value === "Home" || value === "Reports" ? "Items" : value)
                  }
                  _placeholder={{ color: "gray.700" }}
                  pl={10}
                  onChange={(e) => {
                    setData(e.target.value);
                    if (e.target.value) {
                      if (value === "Home" || value === "Reports")
                        navigate(`Search/Items`);
                      else navigate(`Search/${value}`);
                    } else navigate(`${value}`);
                  }}
                ></Input>
              </InputGroup>
            }
          </FormControl>
        </Box>
      </Form>
    </Formik>
  );
};
