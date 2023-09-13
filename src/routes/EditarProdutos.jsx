import { useNavigate, useParams } from "react-router-dom"
import { ListaProdutos } from "../components/ListaProdutos";
import { useState } from "react";

export default function EditarProdutos() {

  //Recuperando o ID que chega no request através do PATH.
  //Vamos Utilizar o Hook userParams().

  document.title = "EDITAR PRODUTOS"

  const navigate = useNavigate(); 

  const {id} = useParams();

  const produtoRecuperado = ListaProdutos.filter((produto) => produto.id == id)[0]
  
  {/*const [counter, setCounter] = useState(0);*/}

  const [produto, setProduto] = useState({
    id: produtoRecuperado.id,
    nome: produtoRecuperado.nome,
    desc: produtoRecuperado.desc,
    preco: produtoRecuperado.preco
  });

  const handleChange = (e) =>{
    //Destrutiring
    const {name,value} = e.target;

    //Utilizando o SPREAD para adicionar o conteúdo no state:
    setProduto({...produto,[name]:value});

  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    let indice;

    ListaProdutos.forEach((item, index) =>{
      if(item.id == produto.id){
        indice = index;
      }
    });
    ListaProdutos.splice(indice,1,produto);
    alert("Seu produto foi alterado com Sucesso!")
    navigate("/produtos");
  }

  return (
    <>
      {/* <div>
        <button onClick={()=> setCounter(counter + 1)}>COUNTER - {counter}</button>
      </div> */}
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Produto Selecionado</legend>
            <div>
              <input type="hidden" name="id" value={produto.id} />
            </div>
            <div>
              <label htmlFor="idNome">Nome</label>
              <input
                type="text"
                name="nome"
                id="idNome"
                value={produto.nome} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="idDescricao">Descrição</label>
              <input
                type="text"
                name="desc"
                id="idDescricao"
                value={produto.desc} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="idPreco">Preço</label>
              <input
                type="text"
                name="preco"
                id="idPreco"
                value={produto.preco} onChange={handleChange}/>
            </div>
            <div>
              <button>EDITAR</button>
            </div>
          </fieldset>
        </form>
        {/* <div>
          <p>{counter}</p>
        </div> */}
      </div>
      <div>
        <p>Nome : {produto.nome}</p>
      </div>
    </>
  )
}
