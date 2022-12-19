import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { user } from "../fixtures/user";

describe("Pruebas en fetch", () => {
  let token = "";
  Storage.prototype.getItem = () => token;

  test("debe ejecutar fetchSinToken", async () => {
    const resp = await fetchSinToken("auth", user, "POST");
    const body = await resp.json();
    expect(resp instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("should first", async () => {
    const resp = await fetchConToken(
      "events/61f1a2a5ea21a96fc783033e",
      {},
      "DELETE"
    );
    const body = await resp.json();
    expect(body.msg).toBe("Evento no encontrado");
  });
});
