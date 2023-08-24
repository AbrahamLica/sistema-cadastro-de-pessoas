import { createContext, useReducer } from "react";
import {
  ActionType,
  ChildrenType,
  InitialStateContextType,
  modalReducerInitialStateType,
  ContextType,
  cadastroReducerInitialStateType,
} from "../types/types";

//////////////////////// REDUCER MODAL /////////////////////////

export const modalReducerInitialState: modalReducerInitialStateType = {
  isOpenModalCadastro: false,
  isOpenModalEdit: false,
  pos: 0,
  themeLight: true,
};

export function reducerModal(
  state: modalReducerInitialStateType,
  action: ActionType
) {
  switch (action.type) {
    case "OPEN_CADASTRO":
      return { ...state, isOpenModalCadastro: action.payload.modalCadastro };
      break;

    case "CLOSE_CADASTRO":
      return { ...state, isOpenModalCadastro: action.payload.modalCadastro };
      break;

    case "OPEN_EDITAR":
      return { ...state, isOpenModalEdit: action.payload.modalEdit };
      break;

    case "CLOSE_EDITAR":
      return { ...state, isOpenModalEdit: action.payload.modalEdit };
      break;

    case "SET_POS":
      return { ...state, pos: action.payload.pos };
      break;

    case "SWITCH_THEME":
      return { ...state, themeLight: action.payload.themeLight };
      break;
  }
  return state;
}

////////////////////// REDUCER CADASTRO DE PESSOAS /////////////////////////

export const cadastroReducerInitialState: cadastroReducerInitialStateType[] =
  [];

export function reducerCadastro(
  state: cadastroReducerInitialStateType[],
  action: ActionType
) {
  switch (action.type) {
    case "CADASTRAR":
      let newState = [...state];
      newState.push({
        id: action.payload?.id,
        name: action.payload?.name,
        email: action.payload?.email,
        nameEdit: action.payload?.name,
        emailEdit: action.payload?.email,
      });
      return newState;
      break;

    case "DEL":
      let newStatee = [...state];
      newStatee = newStatee.filter((item) => item.id !== action.payload?.id);
      return newStatee;
      break;

    case "EDIT":
      let newStateee = [...state];
      newStateee[action.payload.pos].name = action.payload.name;
      newStateee[action.payload.pos].email = action.payload.email;
      return newStateee;
      break;

    case "RESET":
      return cadastroReducerInitialState;
  }
  return state;
}

////////////////////// CONTEXT //////////////////////////////

const ContextInitialState = {
  modal: modalReducerInitialState,
  cadastro: cadastroReducerInitialState,
};

export const Context = createContext<ContextType>({
  state: ContextInitialState,
  dispatch: () => null,
});

const mainReducer = (state: InitialStateContextType, action: ActionType) => ({
  modal: reducerModal(state.modal, action),
  cadastro: reducerCadastro(state.cadastro, action),
});

export function ContextProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(mainReducer, ContextInitialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
