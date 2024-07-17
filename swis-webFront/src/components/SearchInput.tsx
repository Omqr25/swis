import { Box, FormControl, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { BsSearch } from "react-icons/bs";
import resizeWindow from "../resizeWindow";
interface Search{
    text : string;
}
export const SearchInput = () => {  
    const handleSearch = (vlaues : Search) => {
        console.log(vlaues);
    }
    const {width} = resizeWindow();
  return (
    <Formik
    initialValues={{text : ''}}
    onSubmit={handleSearch}
    >
        <Form>
            <Box bgColor={'gray'} borderRadius={20}>
                <FormControl id="text">
                    <InputGroup>
                    <InputLeftElement children={<BsSearch />} />
                    <Field
                    name="text"
                    as={Input}
                    borderRadius={20}
                    width={{lg:width * 2/3 , base: width * 1 / 3}}
                    placeholder="Search about your product"
                    _placeholder={{ color: "gray.700" }}
                    pl={10}
                    >
                    </Field>
                    </InputGroup>
                </FormControl>
            </Box>
        </Form>
    </Formik>

    
  )
}
