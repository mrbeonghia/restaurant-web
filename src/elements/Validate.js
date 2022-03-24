const { STRINGS } = require("../constants/Strings");

const Validate = {
  validatePassword: ({ getFieldValue }) => ({
    validator(rule, value) {
      const re = /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]*$/;
      if (value === undefined || value.length === 0) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("数字、英字をそれぞれ1文字以上含めてください。");
      } else if (value.length < 8 || value.length > 32) {
        return Promise.reject("8文字以上32文字以内で入力してください。");
      } else {
        return Promise.resolve();
      }
    },
  }),
  emptyContent: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      if (
        value === undefined ||
        value === null ||
        value.length === 0 ||
        regex.test(value)
      ) {
        return Promise.reject("This field is required");
      } else {
        return Promise.resolve();
      }
    },
  }),
  phoneNumber: ({ getFieldValue }) => ({
    validator(rule, value) {
      // const re = /^(([0-9]{11}$)|([0-9]{3}-[0-9]{3}-[0-9]{5}$)|([0-9]{3}-[0-9]{4}-[0-9]{4}$)|([0-9]{2}-[0-9]{4}-[0-9]{5}$))/;
      const regex = /^\s+$/;
      // if (value === undefined || value.length === 0 || regex.test(value)) {
      //   return Promise.reject(STRINGS.this_field_is_required);
      // } else if (!re.test(value)) {
      //   return Promise.reject("11桁で入力してください。");
      // } else {
      //   return Promise.resolve();
      // }
      const re = /^[0-9０-９]*$/;
      // const re = /^\d*$/;
      if (value === undefined || value.length === 0 || regex.test(value)) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("数字で入力してください。");
      } else {
        return Promise.resolve();
      }
    },
  }),
  latlong: ({ getFieldValue }) => ({
    validator(rule, value) {
      const re = /^[-+]?[0-9０-９]{1,7}(\.[0-9０-９]+)?$/;
      if (!re.test(value) && value != undefined && value.length != 0) {
        return Promise.reject(
          rule.field == "latitude"
            ? "経度のフォーマットを正しく入力してください。"
            : "緯度のフォーマットを正しく入力してください。"
        );
      } else {
        return Promise.resolve();
      }
    },
  }),
  email: ({ getFieldValue }) => ({
    validator(rule, value) {
      console.log("object", value);
      const regex = /^\s+$/;
      const re =
        /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (
        value === undefined ||
        value === null ||
        value?.length === 0 ||
        regex.test(value)
      ) {
        return Promise.resolve();
      } else if (!re.test(value)) {
        return Promise.reject(STRINGS.email_error);
      } else {
        return Promise.resolve();
      }
    },
  }),
  isEmpty: (value) => {
    const regex = /^\s+$/;
    if (value === undefined || value.length === 0 || regex.test(value)) {
      return true;
    } else {
      return false;
    }
  },
  removeSpecialCharactors: (str) =>
    str.replace(
      /[^ a-zA-Z0-9@._-\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/g,
      ""
    ),
  sortPosition: (a, b) => {
    if (a.position < b.position) {
      return 1;
    }
    if (a.position > b.position) {
      return -1;
    }
    return 0;
  },
  isFloatNumber: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^[+-]?\d+(\.\d+)?$/;
      if (value === undefined || value.length === 0 || regex.test(value)) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("数字で入力してください。");
      } else {
        return Promise.resolve();
      }
    },
  }),
  smallerThan6: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^[+-]?\d+(\.\d+)?$/;
      if (value === undefined || value.length === 0 || regex.test(value)) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("数字で入力してください。");
      } else if (value < 6 && value >= 0) {
        return Promise.reject("concac");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isUrl: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      if (
        value === undefined ||
        value?.length === 0 ||
        regex.test(value) ||
        value === null
      ) {
        // return Promise.reject(STRINGS.this_field_is_required);
        return Promise.resolve();
      } else if (!re.test(value)) {
        return Promise.reject("無効なURL");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isUrlWithRequired: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      if (
        value === undefined ||
        value?.length === 0 ||
        regex.test(value) ||
        value === null
      ) {
        return Promise.reject("リンク先を入力してください。");
      } else if (!re.test(value)) {
        return Promise.reject("無効なURL");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isNumberCombineJp: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^[0-9０-９]*$/;
      if (
        value === undefined ||
        value.length === 0 ||
        regex.test(value) ||
        value === null
      ) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("数字で入力してください。");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isPositiveNumber: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^[0-9０-９]*[1-9１-９][0-9０-９]*$/;
      if (
        value === undefined ||
        value?.length === 0 ||
        regex.test(value) ||
        value === null
      ) {
        return Promise.reject("This field is required");
      } else if (!re.test(value)) {
        return Promise.reject("This value must be a positive number");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isHexColor: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;
      if (value === undefined || value?.length === 0 || regex.test(value)) {
        return Promise.reject(STRINGS.this_field_is_required);
      } else if (!re.test(value)) {
        return Promise.reject("16進数の色を入力してください。");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isPositiveNumberWithoutRequired: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^[0-9０-９]*[1-9１-９][0-9０-９]*$/;
      if (
        value === undefined ||
        value?.length === 0 ||
        regex.test(value) ||
        value === null
      ) {
        return Promise.resolve();
      } else if (!re.test(value)) {
        return Promise.reject("This value must be a positive number");
      } else {
        return Promise.resolve();
      }
    },
  }),
  isPositiveNumMessage: ({ getFieldValue }) => ({
    validator(rule, value) {
      const regex = /^\s+$/;
      const re = /^[0-9０-９]*[1-9１-９][0-9０-９]*$/;
      if (
        value === undefined ||
        value?.length === 0 ||
        regex.test(value) ||
        value === null
      ) {
        return Promise.resolve();
      } else if (!re.test(value)) {
        return Promise.reject("入力値が正しくありません");
      } else {
        return Promise.resolve();
      }
    },
  }),
};

export { Validate };
