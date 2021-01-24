import React, { useReducer } from "react";
import { login } from "../utils/loginTS";
import LoaderComponent from "./LoaderComponent";
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
  error: ""
};

interface LoginState {
  username: string;
  password: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  isChecked: boolean;
  error: string;
};

// type LoginState = typeof initialState;
// interface LoginAction {
//   type: string;
//   fieldname?: string;
//   payload?: string;
// }

type LoginAction =
  | { type: 'LOGIN' | 'LOGOUT' | 'SUCCES' | 'ERROR' | 'TOGGLECHECK' }
  | { type: 'FIELD'; fieldname: string; payload: string; }

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
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: "username or password is wrong, please try again!",
        isChecked: false,
        username: "",
        password: "",
      };
    case "SUCCES":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
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
  const { isLoading, error, username, password, isLoggedIn, isChecked, } = state;

  const formFilled = isChecked && username !== "" && password !== "";

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
    try {
      await login({ username, password });
      dispatch({ type: "SUCCES" });
    } catch (error) {
      dispatch({ type: "ERROR" });
      console.log("message err:", error);
    }
  };

  const SubmitFormButton = () => (
    <Button
      style={{ width: "100%" }}
      type="submit"
      onClick={onSubmitHandler}
      disabled={!formFilled}
    >
      Submit
    </Button>
  );

  return (
    <Container style={styles.container}>
      {isLoggedIn ? (
        <Message>
          <p>Welcome {username}!</p>
          {/* <p>{message}</p> */}
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
                //onChange={(e) => setUsername(e.currentTarget.value)}
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
            {isLoading ? <LoaderComponent /> : <SubmitFormButton />}
          </Form>
        )}
      {error && (
        <Message negative>
          <p>{error}</p>
          {/* <p>{message}</p> */}
        </Message>
      )}
    </Container>
  );
};


