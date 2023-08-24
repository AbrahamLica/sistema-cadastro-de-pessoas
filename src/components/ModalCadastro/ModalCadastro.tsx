import React, { ChangeEvent, useState } from "react";
import imgClose from "../../img/close.png";
import "./ModalCadastro.css";
import { Context } from "../../context/context";
import { useContext } from "react";

export const ModalCadastro = () => {
  const { state, dispatch } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [spanName, setSpanName] = useState("");
  const [spanEmail, setSpanEmail] = useState("");
  var nameValid = false;
  var emailValid = false;

  function fechaModal() {
    dispatch({
      type: "CLOSE_CADASTRO",
      payload: {
        modalCadastro: false,
      },
    });
  }

  function cadastraPessoa() {
    var id = Math.random();
    validateInputName();
    validateInputEmail();

    if (nameValid == true && emailValid == true) {
      dispatch({
        type: "CADASTRAR",
        payload: {
          id: id,
          name: name,
          email: email,
        },
      });
      fechaModal();
    }

    if (!nameValid && !emailValid) {
      alert(spanName);
      alert(spanEmail);
    } else if (!nameValid) {
      alert(spanName);
    } else if (!emailValid) {
      alert(spanEmail);
    }
  }

  function inputSetName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function inputSetEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function validateInputName() {
    if (!name) {
      setSpanName('o campo "Nome" não pode estar vazio!');
      nameValid = false;
    } else if (name.length >= 1 && name.length < 3) {
      setSpanName("O campo 'Nome' não pode ter menos de 3 caracteres!");
      nameValid = false;
    } else if (containsSpecialChars(name) == true) {
      setSpanName("O campo 'Nome' não pode ter caracteres especiais!");
      nameValid = false;
    } else {
      setSpanName("");
      nameValid = true;
    }
  }

  function containsSpecialChars(str: string) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return specialChars.test(str);
  }

  function validateInputEmail() {
    if (!email) {
      setSpanEmail("O campo 'Email' está vazio!");
      emailValid = false;
    } else if (email.length < 6) {
      setSpanEmail("O campo 'Email' não pode ter menos de 6 caracteres!");
      emailValid = false;
    } else if (validateEmail(email) == false) {
      setSpanEmail("O campo 'Email' não está seguindo o padrão correto. Exemplo de email padrão: 'fulano@gmail.com'");
      emailValid = false;
    } else {
      emailValid = true;
      setSpanEmail("");
    }
  }

  function validateEmail(str: string) {
    //REGEXP para validar campo do email
    const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    return emailRegex.test(str);
  }

  return (
    <div className="container">
      <div className="card">
        <a className="txtName">Cadastrar novo usuário</a>

        <div className="inputBox">
          <input
            type="text"
            required
            value={name}
            onChange={inputSetName}
            onBlur={validateInputName}
          />
          <span>Nome</span>
          <p>{spanName}</p>
        </div>

        <div className="inputBox">
          <input
            type="text"
            required
            value={email}
            onChange={inputSetEmail}
            onBlur={validateInputEmail}
          />
          <span>Email</span>
          <p>{spanEmail}</p>
        </div>

        <div className="containerButtons">
          <button className="btn" onClick={cadastraPessoa}>
            Cadastrar
          </button>
          <button className="btn" onClick={fechaModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
