import { Button } from "semantic-ui-react";
interface ISubmitFormButton {
  onSubmitHandler: (e: React.FormEvent) => Promise<void>;
  formFilled: boolean;
}

export default function SubmitFormButton({ onSubmitHandler, formFilled }: ISubmitFormButton) {
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