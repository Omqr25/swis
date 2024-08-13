import { Box } from "@chakra-ui/react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import BarChart from "../components/Home/BarChart";
import useHome from "../hooks/useHome";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const HomePage = () => {
 const DataArrayCopy = useHome();
 return (
  <Box maxH={"625px"} overflowY={'auto'} maxW={'1350px'} overflowX={'auto'}>
    {DataArrayCopy.map((copy,index) =>(
      <BarChart key={index} dataArray={copy.HomeArray} />
    ))}
  </Box>
);
};
