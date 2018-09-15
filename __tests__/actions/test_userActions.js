import * as actions from "../../app/actions/userActions";
import * as types from "../../app/actions/ActionTypes";

describe("User Actions", () => {
  it("should create an action to update set user", () => {
    const currentUser = {
      additionalUserInfo: {
        username: null,
        providerId: "password",
        isNewUser: true,
        profile: null
      },
      user: {
        phoneNumber: null,
        uid: "asdglIODSG09",
        providerId: "firebase",
        providerData: [
          {
            providerId: "password",
            uid: "UID",
            email: "df@email.com"
          }
        ],
        displayName: null,
        refreshToken: "AEOGSOIJ",
        email: "df@email.com",
        isAnonymous: false,
        metadata: {
          creationTime: 153680311,
          lastSignInTime: 153680311
        },
        emailVerified: false,
        photoURL: null
      }
    };
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      currentUser
    };
    expect(actions.setCurrentUser(currentUser)).toEqual(expectedAction);
  });
});
