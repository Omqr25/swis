import { Select } from "@chakra-ui/react";
import { WarehouseForKeeper } from "../../entities/warehouse";
import useGetOne from "../../hooks/useGetOne";
import useCreateTransactionStore from "../../stores/createTransactionStroe";

interface Props{
    selectItem : (selectedItem : number) => void;
    setSelectedQuantity : (SelectedQuantity : number) => void;
}

export const KeeperItemsSelector = ({selectItem , setSelectedQuantity} : Props) => {
  const {UserId} = useCreateTransactionStore();
  const warehouse = useGetOne<WarehouseForKeeper>(Number(UserId) , "warehouses/showWarehouseOfKeeper");
  const items = warehouse.data?.data?.items || [];
    const handleSelectItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectItem(Number(event.target.value));
        const Item = items.find(item => item.id === Number(event.target.value));
        const SelectedQuantity = Item?.quantity;
        if(SelectedQuantity)
        setSelectedQuantity(SelectedQuantity);
      };
  return (
    <Select
    placeholder="select item"
    onChange={handleSelectItem}
    name="item"
    borderRadius={20}
    width={"full"}
    color="gray.400"
    >
    { items.map((item) => (
        <option key={item.id} value={item.id}>{item.name}</option>
    )) }
    </Select>
  )
}
