import { useParams } from "react-router-dom"

const BudBoxDetails = () => {
    const id = useParams();
    console.log(id)
  return (
    <div>
      <h1>BudBox Details</h1>
    </div>
  )
}

export default BudBoxDetails
