import { Link, useLocation } from "react-router-dom"
import { AddButton } from "../components/AddButton"
import { TransactionTable } from "../components/Transaction/TransactionTable"
import { TransactionSearchTable } from "../components/Transaction/TransactionSearchTable";

export const TransactionPage = () => {
  const location = useLocation();
  const currentPath = location.pathname; 

  const Search = currentPath.includes("Search");
  
  return (
    <>
   {Search ? <TransactionSearchTable />:<TransactionTable />}
   {!Search && <Link to={"Create"}>
   <AddButton />
   </Link>}
   </>
  )
}
