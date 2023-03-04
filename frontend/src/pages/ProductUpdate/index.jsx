import { useEffect, useState } from "react";
import { Container } from "../ClienteRegister/style";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function ProductUpdate() {
  const [nome, setNome] = useState('');
  const [medida, setMedida] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const promise = axios.get(`${import.meta.env.VITE_URL}/products/${id}`);

    promise.then(res => {
      setNome(res.data.nome);
      setMedida(res.data.medida);
    })
  },[])

  async function updateProduct(event) {
    event.preventDefault();

    const body = {
      id,
      nome,
      medida
    }

    try {
      await axios.put(`${import.meta.env.VITE_URL}/products/update/${id}`,body);
      alert("Sucesso!");
      navigate('/products');
    } catch (error) {
      alert("Falha ao atualizar produto!");
    }
  }

  return(
    <Container>
      <div className="voltar" onClick={() => navigate('/products')}>
        <IoArrowBackCircleSharp color="crimson" size={60} />
      </div>
      <form onSubmit={updateProduct}>
        <input type="text"
          value={nome}
          placeholder="Nome"
          onChange={e => setNome(e.target.value)}
        />
        <input type="text"
          value={medida}
          placeholder="Medida"
          onChange={e => setMedida(e.target.value)}
        />
        <button type="submit">
          Atualizar dados
        </button>
      </form>
    </Container>
  )
}