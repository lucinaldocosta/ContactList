import React, { useState, useEffect } from "react";
import FormularioDeContato from "./FormularioDeContato";
import "../Styles/ListaDeContatos.css"

function ListaDeContatos() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contatos")
      .then((res) => res.json())
      .then((data) => setContatos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAdicionarContato = (contato) => {
    setContatos((prevContato) => [...prevContato, contato]);
  };

  return (
    <div className="container">
      <FormularioDeContato onAdicionarContato={handleAdicionarContato} />
      <h1 className="title">Lista de Contatos</h1>

      <ul className="contact-list">
        {contatos.map((contato) => (
          <li key={contato.id} className="contact-list-item">
            <div className="contact-info">
              <div className="contact-name">{contato.nome}</div>
              <div className="contact-phone">{contato.telefone}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeContatos;
