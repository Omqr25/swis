import { create } from "zustand";
import {
  TransactionDriverRequest,
  TransactionItemRequest,
} from "../entities/Transactions";

interface createTransactionStore {
  UserId : number;
  Items : TransactionItemRequest[];
  Drivers : TransactionDriverRequest[];
  setUserId: (id: number) => void;
  setItems: (items: TransactionItemRequest[]) => void;
  setDrivers: (drivers: TransactionDriverRequest[]) => void;
}

const useCreateTransactionStore = create<createTransactionStore>()((set) => ({
  UserId : 0,
  Items : [],
  Drivers : [],
  setUserId: (user_id) =>
    set(()=> ({ UserId: user_id  })),
  setItems: (items) =>
    set(() => ({ Items:  items  })),
  setDrivers: (drivers) =>
    set(() => ({ Drivers :  drivers  })),
}));

export default useCreateTransactionStore;
