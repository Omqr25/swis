import {
    Icon,
    Image,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorMode
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import {
    FaArrowRight,
    FaCalendarAlt,
    FaCheckCircle,
    FaCode,
    FaExchangeAlt,
    FaFileInvoice,
    FaImage,
    FaQrcode,
    FaStickyNote,
    FaUser,
    FaUsers,
} from "react-icons/fa";
import { TransactionSearch } from "../../entities/Transactions";
import useSearch from "../../hooks/useSearch";
import useSearchStore from "../../stores/SearchStore";
import { Error } from "../Error";
import { TableSkeleton } from "../Skeleton/TableSkeleton";
  
  
  export const TransactionSearchTable = () => {
    const padding = [10, 5];
    const borderEnd = "2px solid gray";
    const { colorMode } = useColorMode();
    const textColor = colorMode === "dark" ? "white" : "black";
    const { t } = useTranslation();
    const { data: SearchData } = useSearchStore();
    const { data, isLoading, error } = useSearch<TransactionSearch>(
      "search/searchtransactions",
      SearchData
    );
    if (isLoading) {
      return <TableSkeleton />;
    }
    if (error) {
      return <Error message={error.message}></Error>;
    }
    if(!data.data){
        return <Text fontSize={40} m={32} textAlign={'center'}>There is No Such Item</Text>
      }
    return (
      <TableContainer
        maxW="1330px"
        maxH={"625px"}
        overflowX="auto"
        overflowY="auto"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
      >
          <Table variant="simple">
            <Thead>
              <Tr borderBottom={`4px solid ${textColor}`}>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaUser} pr={1} pt={3} />
                  {t("Transaction Owner")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaUsers} pr={1} pt={3} />
                  {t("is_convoy")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaStickyNote} pr={1} pt={3} />
                  {t("notes")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaCode} pr={1} pt={3} />
                  {t("Code")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaCheckCircle} pr={1} pt={3} />
                  {t("Status")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaCalendarAlt} pr={1} pt={3} />
                  {t("Date")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaExchangeAlt} pr={1} pt={3} />
                  {t("Transaction_type")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaArrowRight} pr={1} pt={3} />
                  {t("Transaction_mode_type")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaFileInvoice} pr={1} pt={3} />
                  {t("Waybill_num")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaImage} pr={1} pt={3} />
                  {t("Waybill_img")}
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {" "}
                  <Icon boxSize={"25px"} as={FaQrcode} pr={1} pt={3} />
                  QR Code
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  CTN
                </Th>
                <Th px={padding[0]} py={padding[1]} textColor={textColor}>
                  {t("Items")}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
                  {data.data.map((Tra) => (
                    <Tr borderBottom="2px solid gray" key={Tra.searchable.id}>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.user_id}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.is_convoy ? "Yes" : "No"}
                      </Td>
                      <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                        {Tra.searchable.notes?.en}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.code}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.status}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.date}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.transaction_type}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.transaction_mode_type}
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.waybill_num}
                      </Td>
                      <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                        <Popover>
                          <PopoverTrigger>
                            <Image
                              src={Tra.searchable.waybill_img}
                              alt={"bill image"}
                              borderRadius={"10%"}
                              boxSize={"50px"}
                              fallbackSrc="https://via.placeholder.com/200"
                              cursor="pointer"
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <Image
                              src={Tra.searchable.waybill_img}
                              alt={"bill image"}
                              borderRadius={"10%"}
                              boxSize={"300px"}
                              fallbackSrc="https://via.placeholder.com/200"
                            />
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                        <Popover>
                          <PopoverTrigger>
                            <Image
                              src={Tra.searchable.qr_code}
                              alt={"QR Code"}
                              borderRadius={"10%"}
                              boxSize={"50px"}
                              fallbackSrc="https://via.placeholder.com/200"
                              cursor="pointer"
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <Image
                              src={Tra.searchable.qr_code}
                              alt={"QR Code"}
                              borderRadius={"10%"}
                              boxSize={"200px"}
                              fallbackSrc="https://via.placeholder.com/200"
                            />
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td
                        borderEnd={borderEnd}
                        px={padding[0]}
                        py={padding[1]}
                        textAlign={"center"}
                      >
                        {Tra.searchable.CTN}
                      </Td>
                      <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                       
                      </Td>
                    </Tr>
                  ))}
                
            </Tbody>
          </Table>
      </TableContainer>
    );
  };
  