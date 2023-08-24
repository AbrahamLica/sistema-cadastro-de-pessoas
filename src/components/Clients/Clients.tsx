import "./Clients.css";
import trash from "../../img/trash.png";
import { Context } from "../../context/context";
import { useContext } from "react";

const Clients = () => {
  const { state, dispatch } = useContext(Context);

  function openModalEdit() {
    dispatch({
      type: "OPEN_EDITAR",
      payload: {
        modalEdit: true,
      },
    });
  }

  function excluirUsuario(item: any, id: any) {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      dispatch({
        type: "DEL",
        payload: {
          id: id,
          name: item,
        },
      });
    }
  }

  function editarUsuario(index: any) {
    dispatch({
      type: "SET_POS",
      payload: {
        pos: index,
      },
    });

    openModalEdit();
  }

  function resetAll() {
    if (window.confirm("Tem certeza que deseja excluir todos os itens?")) {
      dispatch({
        type: "RESET",
      });
    }
  }

  return (
    <div className="containerGeral">
      <div className="containerBtnReset">
        <img src={trash} alt="Lixeira" onClick={resetAll} />
      </div>

      <table className={state.modal.themeLight ? "tableLight" : "tableDark"}>
        <thead>
          <tr className={state.modal.themeLight ? "rowLight" : "rowDark"}>
            <th
              className={
                state.modal.themeLight ? "tHeaderLight" : "tHeaderDark"
              }
            >
              NOME
            </th>
            <th
              className={
                state.modal.themeLight ? "tHeaderLight" : "tHeaderDark"
              }
            >
              EMAIL
            </th>
          </tr>
        </thead>

        {state.cadastro.map((item, index) => (
          <tbody key={index}>
            <tr className={state.modal.themeLight ? "rowLight" : "rowDark"}>
              <td
                className={state.modal.themeLight ? "tDataLight" : "tDataDark"}
              >
                {item.name}
              </td>
              <td
                className={state.modal.themeLight ? "tDataLight" : "tDataDark"}
              >
                {item.email}
              </td>

              <td className="containerButtons">
                <button
                  onClick={() => editarUsuario(index)}
                  className={
                    state.modal.themeLight ? "btnEditarLight" : "btnEditarDark"
                  }
                >
                  Editar
                </button>

                <button
                  onClick={() => excluirUsuario(item.name, item.id)}
                  className={
                    state.modal.themeLight
                      ? "btnExcluirLight"
                      : "btnExcluirDark"
                  }
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Clients;
