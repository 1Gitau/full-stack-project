import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

function registerStore(set) {
  return {
    user: null,

    setUser: function (registerInformationObj) {
      set((_state) => {
        return {
          user: registerInformationObj,
        };
      });
    },

    logout: function () {
      set((_state) => {
        return {
          user: null,
        };
      });
    },
  };
}

const userStoreDetails = create(registerStore, devtools(persist()));

export default userStoreDetails;
