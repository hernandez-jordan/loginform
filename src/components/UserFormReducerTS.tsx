import React, { useReducer } from "react";
import { login } from "../utils/loginTS";
import LoaderComponent from "./LoaderComponent";
import { MessageUI } from "./MessageUI";
import SubmitFormButton from './SubmitFormButton'
import { Button, Checkbox, Container, Form, Message } from "semantic-ui-react";

const styles = {
  container: {
    width: 400,
    margin: "auto",
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const initialState: LoginState = {
  username: "",
  password: "",
  isLoading: false,
  isLoggedIn: false,
  isChecked: false,
  errorMessage: "",
  succesMessage: "",
};

interface LoginState {
  username: string;
  password: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  isChecked: boolean;
  errorMessage: string;
  succesMessage: string;
};

type LoginAction =
  | { type: 'LOGIN' | 'LOGOUT' | 'TOGGLECHECK' }
  | { type: 'FIELD'; fieldname: string; payload: string; }
  | { type: 'ERROR'; errorMessage: string }
  | { type: 'SUCCES'; succesMessage: string }

function loginReducer(state: LoginState, action: LoginAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: "",
        isChecked: false,
        errorMessage: '',
        succesMessage: '',
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        isChecked: false,
        username: "",
        password: "",
      };
    case "SUCCES":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        succesMessage: action.succesMessage,
        errorMessage: '',
      };
    case "FIELD":
      return {
        ...state,
        [action.fieldname]: action.payload,
      };
    case "TOGGLECHECK":
      return {
        ...state,
        isChecked: !state.isChecked,
      };
    default:
      return state;
  }
}

export default function UserFormReducerTS() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { isLoading, errorMessage, succesMessage, username, password, isLoggedIn, isChecked, } = state;
  const formFilled = isChecked && username !== "" && password !== "";
  let showMessage = errorMessage.length || succesMessage.length ? true : false

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
    try {
      const returnValueOfPromise = await login({ username, password });
      dispatch({ type: "SUCCES", succesMessage: returnValueOfPromise as string });
    } catch (error) {
      dispatch({ type: "ERROR", errorMessage: error });
    }
  };

  return (
    <Container style={styles.container}>
      {isLoggedIn ? (
        <Message>
          <p>Welcome {username}!</p>
          <Button onClick={() => dispatch({ type: "LOGOUT" })}> logout</Button>
        </Message>
      ) : (
          <Form>
            <Form.Field>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "FIELD",
                    fieldname: "username",
                    payload: e.currentTarget.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                type="password"
                placeholder="Last Name"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "FIELD",
                    fieldname: "password",
                    payload: e.currentTarget.value,
                  })
                }
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={state.isChecked}
                label="I agree to the Terms and Conditions"
                onClick={() => dispatch({ type: "TOGGLECHECK" })}
              />
            </Form.Field>
            {isLoading ?
              <LoaderComponent /> :
              <SubmitFormButton onSubmitHandler={onSubmitHandler} formFilled={formFilled}
              />}
          </Form>
        )}
      { showMessage &&
        <MessageUI errorMessage={errorMessage} succesMessage={succesMessage} />
      }
    </Container>
  );
};


