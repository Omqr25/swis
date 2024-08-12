import {
  Box,
  Collapse,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TransactionDrivers } from "../components/Transaction/TransactionDrivers";
import { TransactionInformationForm } from "../components/Transaction/TransactionInformationForm";
import { TransactionItems } from "../components/Transaction/TransactionItems";
import { TransactionUserInformation } from "../components/Transaction/TransactionUserInformation";
import useLanguage from "../stores/LanguageStore";

export const CreateTransactionPage = () => {
  const [counter, setCounter] = useState(1);
  const [counterExit, setCounterExit] = useState(1);
  const [Disabled, setDisabled] = useState([true, true, true, true, true]);

  const updateDisabled = (index: number, value: boolean) => {
    setDisabled((prev) => {
      const newDisabled = [...prev];
      newDisabled[index] = value;
      return newDisabled;
    });
  };

  const { lng } = useLanguage();

  const IsDisabled = () => {
    Disabled[0] = Disabled[counter];
    return Disabled[0];
  };
  const [user, setUser] = useState<string>("");
  const { t } = useTranslation();
  return (
    <Box maxH={"625px"} overflowY={"auto"} w={"100%"}>
      <Box m={10} borderWidth={"5px"} maxH={"500px"} overflowY={"auto"}>
        <Tabs
          p={4}
          justifyContent={"space-between"}
          position="relative"
          index={counter - 1}
        >
          <TabList>
            <Tab pr={44} isDisabled={counter != 1}>
              {t("UserInfo")}
            </Tab>
            <Tab pr={44} isDisabled={counter != 2}>
              {t("ChItems")}
            </Tab>
            <Tab pr={44} isDisabled={counter != 3}>
              {t("ChDrivers")}
            </Tab>
            <Tab pr={32} isDisabled={counter != 4}>
              {t("TraInfo")}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Collapse
                in={counter === 1 && counterExit === 1}
                animateOpacity
                transition={{
                  exit: { duration: 1 },
                  enter: { duration: 1, delay: 1 },
                }}
              >
                <TransactionUserInformation
                  updateDisabled={updateDisabled}
                  setUser={setUser}
                />
              </Collapse>
            </TabPanel>

            <TabPanel>
              <Collapse
                in={counterExit === 2}
                animateOpacity
                transition={{
                  exit: { duration: 1 },
                  enter: { duration: 1, delay: 1 },
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ height: counter === 2 ? "auto" : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TransactionItems
                    updateDisabled={updateDisabled}
                    Disabled={Disabled}
                    User={user}
                  />
                </motion.div>
              </Collapse>
            </TabPanel>
            <TabPanel>
              <Collapse
                in={counterExit === 3}
                animateOpacity
                transition={{
                  exit: { duration: 1 },
                  enter: { duration: 1, delay: 1 },
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ height: counter === 3 ? "auto" : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TransactionDrivers
                    updateDisabled={updateDisabled}
                    Disabled={Disabled}
                  />
                </motion.div>
              </Collapse>
            </TabPanel>
            <TabPanel>
              <Collapse
                in={counterExit === 4}
                animateOpacity
                transition={{
                  exit: { duration: 1 },
                  enter: { duration: 1, delay: 1 },
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ height: counter === 4 ? "auto" : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TransactionInformationForm />
                </motion.div>
              </Collapse>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <HStack justifyContent={"center"} m={1}>
        <IconButton
          icon={lng === "en" ? <FaArrowLeft /> : <FaArrowRight />}
          isDisabled={counter === 1}
          colorScheme="blue"
          onClick={() => {
            setTimeout(() => {
              setCounter(counter - 1);
            }, 2000);
            setCounterExit(counterExit - 1);
          }}
          aria-label="previous"
          hidden={counter === 1}
        >
          Previous
        </IconButton>
        <IconButton
          icon={lng === "en" ? <FaArrowRight /> : <FaArrowLeft />}
          isDisabled={counter === 4 || IsDisabled()}
          colorScheme="blue"
          onClick={() => {
            setTimeout(() => {
              setCounter(counter + 1);
            }, 2000);

            setCounterExit(counterExit + 1);
            updateDisabled(0, true);
          }}
          aria-label="Next"
          hidden={counter === 4}
        >
          Next
        </IconButton>
      </HStack>
    </Box>
  );
};
