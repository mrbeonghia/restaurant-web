const changeObject = {};

let data = { title: "", content: "", onCancel: null, onConfirm: null };

const ModalCustomService = {
  get: () => data,

  set: async (newData: {
    title: string,
    content: any,
    onCancel: Function,
    onConfirm: Function,
    confirmWithoutClose: boolean,
    textCancel: string,
    textConfirm: string,
    contentStyle: Object,
    wrapperStyle: Object,
  }) => {
    data = newData;
    Object.keys(changeObject).forEach((k) => changeObject[k]());
  },

  close: () => {
    ModalCustomService.set({});
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

export { ModalCustomService };
