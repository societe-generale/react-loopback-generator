import * as action from "./authentication";
import expect from "expect";


describe("Actions authentication", () => {

  it('login should create AUTHENTICATION_LOGIN action', () => {
    expect(action.login('token')).toEqual({
      type: "AUTHENTICATION_LOGIN",
      payload: 'token'
    })
  })
});
