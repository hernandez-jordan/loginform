import React, { useState } from "react";
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

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  let formFilled = isChecked && username !== "" && password !== "";
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login({ username, password }, setMessage);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setError("");
      setIsChecked(false);
    } catch (error) {
      setError("username or password is wrong, please try again!");
      setIsChecked(false);
    }
    setIsLoading(false);
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
          <p>Hello {username}</p>
          <p> {message}</p>
          <Button onClick={() => setIsLoggedIn(false)}> logout</Button>
        </Message>
      ) : (
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              type="password"
              placeholder="Last Name"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              checked={isChecked}
              label="I agree to the Terms and Conditions"
              onClick={(e) => {
                setIsChecked(!isChecked);
                console.log(isChecked);
              }}
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

export default UserForm;
