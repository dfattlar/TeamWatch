import reducer from "../../app/reducers/userReducer";
import * as types from "../../app/actions/actionTypes";

const initialState = {
  currentUser: {}
};

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

describe("user reducer", () => {
  it("should handle SET_CURRENT_USER", () => {
    const currentUser = {};
    expect(
      reducer(undefined, {
        type: types.SET_CURRENT_USER,
        currentUser
      })
    ).toEqual({
      ...initialState,
      currentUser
    });
  });
});
