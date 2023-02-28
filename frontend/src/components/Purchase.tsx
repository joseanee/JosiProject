import styled from "styled-components/macro";
import { IoEye, IoPencil, IoClose } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Props {
  wasPaid: boolean
}

export default function Purchases({purchases, setChangeState, changeState}) {

  const { id } = useParams();

  async function removePurchaseRegister(id:number) {
    try {
      await axios.delete(`${import.meta.env.VITE_URL}/purchases/${id}/delete`);
      alert("Registro removido!");
      setChangeState(changeState+1);
    } catch (error) {
      alert(error);
    }
  }

  return(
    purchases.map((purchase, index) => 
    <Container key={index} wasPaid={purchase.wasPaid}>
      <h1>Código: {purchase.id}</h1>
      <h1>Data: {(new Date(purchase.createdAt)).toLocaleDateString('pt-br')}</h1>
      {
        purchase.wasPaid ? "" : <h1>Efetuar pagamento: 
          <Link to={`/clients/${id}/purchases/${purchase.id}/payment`}>
        <IoPencil 
        cursor="pointer" 
        size={20} 
        />
      </Link></h1>
      }
      <div className="options">
        <Link to={`/clients/${id}/purchases/${purchase.id}`}>
          <IoEye className="view" color="purple" size={20} cursor="pointer" />
        </Link>
      </div>
      <IoClose 
        className="delete" 
        color="crimson" 
        size={20} 
        cursor="pointer"
        onClick={() => removePurchaseRegister(purchase.id)}  
      />
    </Container>)
  )
}

const Container = styled.div<Props>`
  border: ${props => props.wasPaid ? 'solid 4px green'  : 'solid 4px red'};
  width: 240px;
  height: 120px;
  background-color: #EBECF0;
  padding: 6px;
  margin: 4px;

  position: relative;

  h1 {
    margin: 6px;
    font-size: 16px;
    word-wrap: break-word;
  }

  .options {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 8px;
    right: 8px;

    height: 80px;

    justify-content: space-around;
  }

  .view {
    position: absolute;
    top: 0;
    right: 0;
  }

  .delete {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
`