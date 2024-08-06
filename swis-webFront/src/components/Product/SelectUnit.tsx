import { Select } from "@chakra-ui/react";
interface Props {
  selectUnit: (unit: string) => void;
}
export const SelectUnit = ({ selectUnit }: Props) => {
  const handleSelectUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    selectUnit(event.target.value);
  };
  return (
    <Select
      placeholder="Select Unit"
      onChange={handleSelectUnit}
      borderRadius={"20"}
      width={"full"}
      color="gray.400"
    >
      <option value={1}>KG</option>
      <option value={2}>Piece</option>
      <option value={3}>Bag</option>
      <option value={4}>Liter</option>
      <option value={5}>Parcel</option>
      <option value={6}>Kit</option>
    </Select>
  );
};
