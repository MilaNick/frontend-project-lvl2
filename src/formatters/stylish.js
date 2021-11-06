import { getDiffOfObjects } from '../../index.js';

export default function stylish(obj, isFirstIteration = false) {
  const rows = [];
  const entries = Object.entries(obj);
  entries.forEach((pair) => {
    const key = pair[0];
    const value = pair[1];
    const { type } = value;
    if (type) {
      if (typeof value.value1 === 'object' && value.value1) {
        value.value1 = stylish(getDiffOfObjects(value.value1, value.value1));
      }
      if (typeof value.value2 === 'object' && value.value2) {
        value.value2 = stylish(getDiffOfObjects(value.value2, value.value2));
      }
      if (type === 'added') {
        rows.push(`+ ${key}: ${value.value2}`);
        return;
      }
      if (type === 'deleted') {
        rows.push(`- ${key}: ${value.value1}`);
        return;
      }
      if (type === 'changed') {
        rows.push(`- ${key}: ${value.value1}`);
        rows.push(`+ ${key}: ${value.value2}`);
        return;
      }
      if (type === 'unchanged') {
        rows.push(`  ${key}: ${value.value1}`);
      }
    } else {
      rows.push(`  ${key}: ${stylish(value)}`);
    }
  });
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`)
    .split('\n')
    .join(isFirstIteration ? '\n' : '\n    ');
}
