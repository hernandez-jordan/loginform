import { Message } from "semantic-ui-react";

interface IMessage {
  errorMessage?: string;
  succesMessage?: string
}

export const MessageUI = ({ errorMessage, succesMessage }: IMessage) => {

  return errorMessage?.length ?

    <Message negative>
      <p>{errorMessage}</p>
    </Message>
    :
    <Message positive>
      <p>{succesMessage}</p>
    </Message>


}
