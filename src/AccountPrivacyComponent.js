import { useContext } from "react";
import SettingContext from "./SettingContext";
import { Stack } from "react-bootstrap";
function AccountPrivacyComponent() {
  let { accountPrivacy } = useContext(SettingContext);
  let { setAccountPrivacy } = useContext(SettingContext);

  return (
    <Stack className="d-flex bg-secondary">
      <h3>account: </h3>
      <label htmlFor="public">public</label>
      <input
        type="radio"
        id="public"
        name="account"
        onChange={() => setAccountPrivacy("public")}
        checked={accountPrivacy === "public" ? true : false}
      />
      <label htmlFor="private">private</label>
      <input
        type="radio"
        id="private"
        name="account"
        onChange={() => setAccountPrivacy("private")}
        checked={accountPrivacy === "private" ? true : false}
      />
    </Stack>
  );
}
export default AccountPrivacyComponent;
