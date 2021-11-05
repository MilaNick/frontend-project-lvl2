export default (str) => str.split('\n').join('\n    ');
// uniqKeys.forEach((key) => {
//   if (joint[key][0] === joint[key][1]) {
//     rows.push(`  ${key}: ${joint[key][0]}`);
//     return;
//   }
//   if (joint[key][0] === newSymbol) {
//     rows.push(`+ ${key}: ${joint[key][1]}`);
//     return;
//   }
//   if (joint[key][1] === newSymbol) {
//     rows.push(`- ${key}: ${joint[key][0]}`);
//     return;
//   }
//   if (joint[key][0] !== joint[key][1]) {
//     rows.push(`- ${key}: ${joint[key][0]}`);
//     rows.push(`+ ${key}: ${joint[key][1]}`);
//   }
// });
// return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`);
