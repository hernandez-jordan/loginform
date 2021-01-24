import React, { useReducer } from "react";
import { login } from "../utils/login";
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

function loginReducer(state, action) {
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
        // message: login(),
      };
    case "FIELD":
      return {
        ...state,
        [action.field]: action.value,
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

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  isLoggedIn: false,
  isChecked: false,
  error: "",
  message: "",
};

const UserFormReducer = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const {
    username,
    password,
    isLoading,
    isLoggedIn,
    isChecked,
    error,
    message,
  } = state;

  const formFilled = isChecked && username !== "" && password !== "";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
    try {
      await login({ username, password });
      dispatch({ type: "SUCCES" });
      // console.log("message: try", message);
    } catch (error) {
      dispatch({ type: "ERROR", message: error });
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
          <p>{message}</p>
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
                  field: "username",
                  value: e.currentTarget.value,
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
                  field: "password",
                  value: e.currentTarget.value,
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
          <p>{message}</p>
        </Message>
      )}
    </Container>
  );
};

export default UserFormReducer;
