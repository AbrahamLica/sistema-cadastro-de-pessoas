import "./Home.css";
import { useState } from "react";
import { ModalCadastro } from "../ModalCadastro/ModalCadastro";
import { Context } from "../../context/context";
import { useContext } from "react";
import { ModalEditar } from "../ModalEditar/ModalEditar";
import Clients from "../Clients/Clients";
import avatar from "../../img/avatar2.png";
import linkedin from "../../img/linkedin2.png";
import github from "../../img/github.png";

const Home = () => {
  const { state, dispatch } = useContext(Context);
  const [themeLight, setThemeLight] = useState(true);

  function openModal() {
    dispatch({
      type: "OPEN_CADASTRO",
      payload: {
        modalCadastro: true,
      },
    });
  }

  function switchthemeLight() {
    if (state.modal.themeLight) {
      dispatch({
        type: "SWITCH_THEME",
        payload: {
          themeLight: false,
        },
      });
    }

    if (!state.modal.themeLight) {
      dispatch({
        type: "SWITCH_THEME",
        payload: {
          themeLight: true,
        },
      });
    }
  }

  return (
    <div
      className={
        state.modal.themeLight ? "mainContainerLight" : "mainContainerDark"
      }
    >
      <div className="containerSocialMediasFake"></div>
      <div
        className={
          state.modal.themeLight
            ? "cadastrarContainerLight"
            : "cadastrarContainerDark"
        }
      >
        <div className="containerButtonCadastrar">
          <button
            onClick={openModal}
            className={
              state.modal.themeLight
                ? "buttonCadastrarLight"
                : "buttonCadastrarDark"
            }
          >
            Cadastrar novo usuário
          </button>
          <div className="toggle-switch">
            <label className="switch-label">
              <input
                type="checkbox"
                className="checkbox"
                onClick={switchthemeLight}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="containerTitles">
          {state.modal.isOpenModalCadastro === true && (
            <ModalCadastro></ModalCadastro>
          )}
          {state.modal.isOpenModalEdit === true && <ModalEditar></ModalEditar>}
        </div>
        <div
          className={
            state.modal.themeLight
              ? "containerClientsLight"
              : "containerClientsDark"
          }
        >
          {state.cadastro.length ? <Clients></Clients> : null}
        </div>
      </div>
      <div className="containerSocialMedias">
        <img src={avatar} alt="" width={45} />
        <a
          href="https://www.linkedin.com/in/abraham-melquisedeque-pereira-lic%C3%A1-0a1736203/"
          target="_blank"
        >
          <img src={linkedin} alt="" width={45} />
        </a>
        <a href="https://github.com/AbrahamLica" target="_blank">
          <img src={github} alt="" width={50} />
        </a>
      </div>
    </div>
  );
};

export default Home;
