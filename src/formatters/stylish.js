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
  const rows = Object.entries(obj).reduce((acc, pair) => {
    const key = pair[0];
    const diff = pair[1];
    if (isDiffObject(diff)) {
      const { type } = diff;
      const value1 = (typeof diff.value1 === 'object' && diff.value1) ? getObjAsString(diff.value1) : diff.value1;
      const value2 = (typeof diff.value2 === 'object' && diff.value2) ? getObjAsString(diff.value2) : diff.value2;
      switch (type) {
        case 'added':
          return [...acc, `+ ${key}: ${value2}`];
        case 'removed':
          return [...acc, `- ${key}: ${value1}`];
        case 'updated':
          return [...acc, `- ${key}: ${value1}`, `+ ${key}: ${value2}`];
        case 'notUpdated':
          return [...acc, `  ${key}: ${value1}`];
        default:
          return [...acc];
      }
    } else {
      return [...acc, `  ${key}: ${stylish(diff)}`];
    }
  }, []);
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`)
    .split('\n')
    .join(isFirstIteration ? '\n' : '\n    ');
}
