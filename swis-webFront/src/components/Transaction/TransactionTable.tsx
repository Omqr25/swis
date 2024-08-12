import {
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import useGetAll from "../../hooks/useGetAll";
import Transaction from "../../entities/Transactions";
import { TableSkeleton } from "../Skeleton/TableSkeleton";
import { Error } from "../Error";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
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
import { ItemsDrawer } from "./ItemsDrawer";
import InfiniteScroll from "react-infinite-scroll-component";
import useCreateTransactionStore from "../../stores/createTransactionStroe";

export const TransactionTable = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage , isSuccess} =
    useGetAll<Transaction>("transactions");
  const padding = [10, 5];
  const borderEnd = "2px solid gray";
  const { colorMode } = useColorMode();
  const textColor = colorMode === "dark" ? "white" : "black";
  const { t } = useTranslation();
  const fetchedBranchesCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;

  const {setItems} = useCreateTransactionStore();
  const [done , setDone ] = useState(false);
  if(isSuccess && !done){
    setDone(true);
    setItems([]);
  }
  if (isLoading) {
    return <TableSkeleton />;
  }
  if (error) {
    return <Error message={error.message}></Error>;
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
      <InfiniteScroll
        dataLength={fetchedBranchesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
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
            {data.pages.map((page, index) => (
              <React.Fragment key={index}>
                {page.data.map((Tra) => (
                  <Tr borderBottom="2px solid gray" key={Tra.id}>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.user_id}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.is_convoy ? "Yes" : "No"}
                    </Td>
                    <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                      {Tra.notes}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.code}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.status}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.date}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.transaction_type}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.transaction_mode_type}
                    </Td>
                    <Td
                      borderEnd={borderEnd}
                      px={padding[0]}
                      py={padding[1]}
                      textAlign={"center"}
                    >
                      {Tra.waybill_num}
                    </Td>
                    <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                      <Popover>
                        <PopoverTrigger>
                          <Image
                            src={Tra.waybill_img}
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
                            src={Tra.waybill_img}
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
                            src={Tra.qr_code}
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
                            src={Tra.qr_code}
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
                      {Tra.CTN}
                    </Td>
                    <Td borderEnd={borderEnd} px={padding[0]} py={padding[1]}>
                      <ItemsDrawer items={Tra.details} />
                    </Td>
                  </Tr>
                ))}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
};
