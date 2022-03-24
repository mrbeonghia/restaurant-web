const changeObject = {};

let data = { title: "", content: "", onCancel: null, onConfirm: null };

const AlertService = {
  get: () => data,

  set: async (newData: {
    title: string,
    textConfirm: string,
    textCancel: string,
    content: string,
    onCancel: Function,
    onConfirm: Function,
  }) => {
    data = newData;
    Object.keys(changeObject).forEach((k) => changeObject[k]());
  },

  addEventListener: (key, cb) => {
    changeObject[key] = () => cb(data);
  },

  removeEventListener: (key) => {
    if (changeObject[key]) {
      delete changeObject[key];
    }
  },
};

export { AlertService };
