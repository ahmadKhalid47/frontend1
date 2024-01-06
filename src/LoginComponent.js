import RegisterationContext from "./RegisterationContext";
import { useContext } from "react";
import { Form, FormGroup } from "react-bootstrap";

function LoginComponent() {
  let { login_email } = useContext(RegisterationContext);
  let { login_pass } = useContext(RegisterationContext);
  let { setLogin_pass } = useContext(RegisterationContext);
  let { setLogin_email } = useContext(RegisterationContext);
  return (
    <>
      <div>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            value={login_email}
            onChange={(e) => setLogin_email(e.target.value)}
            placeholder="enter your email here"
          />
        </Form.Group>
        <FormGroup>
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={login_pass}
            onChange={(e) => setLogin_pass(e.target.value)}
            placeholder="enter your password here"
          />
        </FormGroup>
      </div>
    </>
  );
}
export default LoginComponent;
