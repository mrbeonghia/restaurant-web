const changeObject = {};
let data = "";

const HeaderStaffScheduleService = {
  get: () => data,
  set: async (newData) => {
    data = newData;
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

export { HeaderStaffScheduleService };
