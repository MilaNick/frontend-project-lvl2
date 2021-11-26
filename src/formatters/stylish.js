import { isDiffObject } from '../shared.js';

export const isCorrectType = (type) => ['added', 'removed', 'updated', 'notUpdated'].includes(type);

const getObjAsString = (obj) => {
  const str = JSON.stringify(obj, null, 4);
  if (typeof str === 'string') {
    return JSON.stringify(obj, null, 4)
      .replace(/"/g, '')
      .replace(/\n/g, '\n    ')
      .replace(/,\n/g, '\n');
  }
  return '';
};
export default function stylish(obj, isFirstIteration = false) {
  const rows = [];
  const entries = Object.entries(obj);
  entries.forEach((pair) => {
    const key = pair[0];
    const diff = pair[1];
    if (isDiffObject(diff)) {
      const { type } = diff;
      if (typeof diff.value1 === 'object' && diff.value1) {
        diff.value1 = getObjAsString(diff.value1);
      }
      if (typeof diff.value2 === 'object' && diff.value2) {
        diff.value2 = getObjAsString(diff.value2);
      }
      switch (type) {
        case 'added':
          rows[rows.length] = `+ ${key}: ${diff.value2}`;
          return;
        case 'removed':
          rows[rows.length] = `- ${key}: ${diff.value1}`;
          return;
        case 'updated':
          rows[rows.length] = `- ${key}: ${diff.value1}`;
          rows[rows.length] = `+ ${key}: ${diff.value2}`;
          return;
        case 'notUpdated':
          rows[rows.length] = `  ${key}: ${diff.value1}`;
          break;
        default:
      }
    } else {
      rows[rows.length] = `  ${key}: ${stylish(diff)}`;
    }
  });
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`)
    .split('\n')
    .join(isFirstIteration ? '\n' : '\n    ');
}
