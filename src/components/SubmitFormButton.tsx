import React from "react";
import { Button } from "semantic-ui-react";

type SubmitFormButtonProps = {
  onSubmitHandler: (e: React.FormEvent) => Promise<void>;
  formFilled: boolean;
}

const SubmitFormButton = ({ onSubmitHandler, formFilled }: SubmitFormButtonProps): React.ReactElement => {
  return (
    <Button
      style={{ width: "100%" }}
      type="submit"
      onClick={onSubmitHandler}
      disabled={!formFilled}
    >
      Submit
    </Button>
  )
}

export default SubmitFormButton