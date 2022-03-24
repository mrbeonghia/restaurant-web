// console.log("dw", Array.from(Array(2).keys()));
const moment = require("moment");

// console.log(
//   "calam start",
//   moment("2022-01-27T01:00:00.000+00:00").format("YYYY/MM/DD HH:mm")
// );
// console.log(
//   "calam end",
//   moment("2022-01-27T20:00:00.000+00:00").format("YYYY/MM/DD HH:mm")
// );

console.log(
  "start",
  moment("2022-03-12T00:59:58.000Z").format("YYYY/MM/DD HH:mm")
);
console.log("end", moment("2022-01-27T13:30:00.000+00:00").toISOString());
