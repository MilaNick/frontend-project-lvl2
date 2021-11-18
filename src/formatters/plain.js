import { isDiffObject } from '../shared.js';

const getViewValue = (value) => {
  if (typeof value === 'object' && value) {
    return '[complex value]';
  }
  return value;
};
const addQuotesIfNeed = (value) => {
  if ([false, true, null, '[complex value]'].includes(value)) {
    return value;
  }
  return `'${value}'`;
};

export default function plain(obj) {
  const rows = [];
  const fn = (obj, initialPath = []) => {
    const entries = Object.entries(obj);
    entries.forEach((pair) => {
      const [key, obj] = pair;
      const path = [...initialPath];
      path.push(key);
      if (isDiffObject(obj)) {
        const diff = obj;
        const { type } = diff;
        const pathString = path.join('.');
        switch (diff.type) {
          case 'added':
            rows.push(`Property '${pathString}' was ${type} with value: ${addQuotesIfNeed(getViewValue(diff.value2))}`);
            return;
          case 'removed':
            rows.push(`Property '${pathString}' was ${type}`);
            return;
          case 'updated':
            rows.push(`Property '${pathString}' was ${type}. From ${addQuotesIfNeed(getViewValue(diff.value1))} to ${addQuotesIfNeed(getViewValue(diff.value2))}`);
        }
      } else {
        fn(obj, path);
      }
    });
  };
  fn(obj);
  return `${rows.join('\n')}`;
}
