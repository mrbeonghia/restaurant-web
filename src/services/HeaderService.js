import { STRINGS } from "../constants/Strings";

const changeObject = {};
let data = "";

const header = {
  users: "Users",
  coupons: "Coupons",
  staffs: "Staffs",
  categories: "Food Categories",
  foods: "Foods",
  tables: "Tables",
  bookings: "Bookings",
  bookingsHistory: "Bookings History",
};

const HeaderService = {
  get: () => data,
  set: async (key) => {
    data = header[key];
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

export { HeaderService };
