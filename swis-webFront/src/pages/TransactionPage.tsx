import { Link } from "react-router-dom"
import { AddButton } from "../components/AddButton"
import { TransactionTable } from "../components/Transaction/TransactionTable"

export const TransactionPage = () => {

  
  return (
    <>
   <TransactionTable />
   <Link to={"Create"}>
   <AddButton />
   </Link>
   </>
  )
}
