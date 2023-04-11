import React, { useState } from "react";

function FormularioDeContato({onAdicionarContato}) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const contato = { nome, telefone };
    fetch("http://localhost:5000/api/contatos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contato),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error ao adicionar o contato");
        }
      })
      .then((data) => {
        onAdicionarContato(data);
        setNome("");
        setTelefone("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="add-contact-form">
      <h2 className="subtitle">Adicionar Contato</h2>
      <div className="form-group">
        <label htmlFor="nome" className="label">
          Nome
        </label>
        <input
          type="text"   
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input"
          id="nome"
          autoComplete="none"
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefone" className="label">
          Telefone
        </label>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="input"
          id="telefone"
          autoComplete="none"
        />
      </div>
      <button type="submit" className="button">
        Adicionar
      </button>
    </form>
  );
}

export default FormularioDeContato;
