import React, { ChangeEvent, useState } from "react";
import "../ModalCadastro/ModalCadastro.css";
import { Context } from "../../context/context";
import { useContext } from "react";

export const ModalEditar = () => {
  const { state, dispatch } = useContext(Context);
  const [name, setName] = useState(state.cadastro[state.modal.pos].name);
  const [email, setEmail] = useState(state.cadastro[state.modal.pos].email);

  function fechaModal() {
    dispatch({
      type: "CLOSE_EDITAR",
      payload: {
        modalEdit: false,
      },
    });
  }

  function atualizarCadastro() {
    dispatch({
      type: "EDIT",
      payload: {
        name: name,
        email: email,
        pos: state.modal.pos,
      },
    });
    fechaModal();
  }

  function inputSetName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function inputSetEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <div className="container">
      <div className="card">
        <a className="txtName">Atualizar informações</a>

        <div className="inputBox">
          <input type="text" required value={name} onChange={inputSetName} />
          <span>Nome</span>
        </div>

        <div className="inputBox">
          <input type="text" required value={email} onChange={inputSetEmail} />
          <span>Email</span>
        </div>

        <div className="containerButtons">
          <button className="btn" onClick={atualizarCadastro}>
            Atualizar
          </button>
          <button className="btn" onClick={fechaModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
