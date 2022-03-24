import { STRINGS } from "../constants/Strings";

const changeObject = {};
let data = "";

const MenuCollapsingService = {
  get: () => data,
  set: async () => {
    Object.keys(changeObject).forEach((k) => changeObject[k]());
  },

  onChange: (key, cb) => {
    changeObject[key] = () => cb(data);
  },

  deleteKey: (key) => {
    if (changeObject[key]) {
      delete changeObject[key];
    }
  },
};

export { MenuCollapsingService };
