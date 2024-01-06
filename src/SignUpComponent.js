import { Form } from "react-bootstrap";
import RegisterationContext from "./RegisterationContext";
import { useContext } from "react";

function SignUpComponent() {
  let { sign_email } = useContext(RegisterationContext);
  let { setSign_email } = useContext(RegisterationContext);
  let { sign_pass } = useContext(RegisterationContext);
  let { setSign_pass } = useContext(RegisterationContext);
  let { sign_pass_match } = useContext(RegisterationContext);
  let { setSign_pass_match } = useContext(RegisterationContext);
  let { sign_userName } = useContext(RegisterationContext);
  let { setSign_userName } = useContext(RegisterationContext);

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            value={sign_email}
            onChange={(e) => setSign_email(e.target.value)}
            placeholder="enter your email here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Create Password: </Form.Label>
          <Form.Control
            type="password"
            value={sign_pass}
            onChange={(e) => setSign_pass(e.target.value)}
            placeholder="create your password here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rewrite password: </Form.Label>
          <Form.Control
            type="password"
            value={sign_pass_match}
            onChange={(e) => {
              setSign_pass_match(e.target.value);
            }}
            placeholder="rewrite your password here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Create a user name: </Form.Label>
          <Form.Control
            type="text"
            value={sign_userName}
            onChange={(e) => {
              setSign_userName(e.target.value);
            }}
            placeholder="create your user name here"
          />
        </Form.Group>
      </Form>
    </>
  );
}
export default SignUpComponent;
