import { useBreakpointValue } from "@chakra-ui/react";
import Home from "../entities/Home";
import useGetHome from "./useGetHome";

interface Copy {
  HomeArray: Home[];
}
const useHome = () => {
  const { data } = useGetHome<Home>(
    "transactionWarehouseItems/inventoryForAllWarehouses"
  );
  const dataArray = data?.data || [];
  let idx = 0;
  let DataArrayCopy: Copy[] = [];
  const showTabs = useBreakpointValue({ md: false, lg: true });
  let number = showTabs ? 3 : 2;
  if (number === 3)
    for (let counter = 0; counter < dataArray.length / 3; counter++) {
      let element1 = dataArray[idx];
      let element2 =
        idx + 1 < dataArray.length ? dataArray[idx + 1] : undefined;
      let element3 =
        idx + 2 < dataArray.length ? dataArray[idx + 2] : undefined;
      const dataArrayCopy: Home[] = [element1, element2, element3].filter(
        Boolean
      ) as Home[];
      DataArrayCopy = [...DataArrayCopy, { HomeArray: dataArrayCopy }];
      idx += 3;
    }
  else {
    for (
      let counter = 0;
      counter < dataArray.length / 2 + (dataArray.length % 2 != 0 ? 1 : 0);
      counter++
    ) {
      let element1 = dataArray[idx];
      let element2 =
        idx + 1 < dataArray.length ? dataArray[idx + 1] : undefined;
      const dataArrayCopy: Home[] = [element1, element2].filter(
        Boolean
      ) as Home[];
      DataArrayCopy = [...DataArrayCopy, { HomeArray: dataArrayCopy }];
      idx += 2;
    }
  }

  return DataArrayCopy;
};
export default useHome;
