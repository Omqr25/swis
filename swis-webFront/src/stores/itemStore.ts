import { create } from "zustand";
import item from "../entities/items";

interface itemStore {
  item: item;
  setId: (id: number) => void;
  setCode: (code: string) => void;
  setName: (name: string) => void;
  setSectorType: (sectorType: string) => void;
  setUnitType: (unitType: string) => void;
  setQuantity: (quantity: number) => void;
  setSize: (size: number) => void;
  setWeight: (weight: number) => void;
  setItem: (item: item) => void;
}

const useItemStore = create<itemStore>((set) => ({
  item: {},
  setId: (id) => set((store) => ({ item: { ...store.item, id } })),
  setName: (name) => set((store) => ({ item: { ...store.item, name } })),
  setCode: (code) => set((store) => ({ item: { ...store.item, code } })),
  setSectorType: (sectorType) =>
    set((store) => ({ item: { ...store.item, sectorType } })),
  setUnitType: (unitType) =>
    set((store) => ({ item: { ...store.item, unitType } })),
  setQuantity: (quantity) =>
    set((store) => ({
      item: { ...store.item, "quantity in the system": quantity },
    })),
  setSize: (size) => set((store) => ({ item: { ...store.item, size } })),
  setWeight: (weight) => set((store) => ({ item: { ...store.item, weight } })),
  setItem: (item) => set(() => ({ item: item })),
}));

export default useItemStore;
