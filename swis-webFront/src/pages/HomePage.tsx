import { Box, IconButton, Text } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import BarChart from "../components/Home/BarChart";
import { WarehousesSelector } from "../components/WarehousesSelector";
import useHome from "../hooks/useHome";
import BarChartSkeleton from "../components/Skeleton/BarChartSkeleton";
import { AddIcon } from "@chakra-ui/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const HomePage = () => {
  const [selectedWarehouse , selectWarehouse] = useState<number>(0);
 const {DataArrayCopy , isLoading , WarehouseDataLoading , refetch} = useHome(selectedWarehouse);
 return (
  <Box maxH={"625px"} overflowY={'auto'} maxW={'1350px'} overflowX={'auto'}>
    <Box 
    position={'fixed'}
    p={2}
    >
      <WarehousesSelector selectWarehouse={selectWarehouse} />
    </Box>
    {isLoading && <BarChartSkeleton />}
    {WarehouseDataLoading && <BarChartSkeleton />}
    {(!isLoading && !WarehouseDataLoading ) && DataArrayCopy.map((copy,index) =>(
      <BarChart key={index} dataArray={copy.HomeArray} />
    ))}
    {DataArrayCopy.length === 0 && <Text fontSize={20} p={64} textAlign={'center'}>NO Reports </Text>}
    {selectedWarehouse && <IconButton  colorScheme="green"
        aria-label="Add Branch"
        icon={<AddIcon />}
        isRound
        position={"fixed"}
        bottom={4}
        left={{ base: 4, md: 8, lg: 204 }}
        onClick={() => refetch()}/>}
  </Box>
);
};
