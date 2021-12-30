const getComplexValueIfNeed = (value) => {
  if (typeof value === 'object' && value) {
    return '[complex value]';
  }
  return value;
};

const addQuotesIfNeed = (value) => {
  if ([false, true, null, '[complex value]'].includes(value) || typeof value === 'number') {
    return value;
  }
  return `'${value}'`;
};

export default function plain(object) {
  const fn = (obj, initialPath = []) => {
    const entries = Object.entries(obj);
    return entries.flatMap((pair) => {
      const [key, valueObj] = pair;
      const path = [...initialPath, key];
      const diff = valueObj;
      const { type } = diff;
      const pathString = path.join('.');
      switch (type) {
        case 'added':
          return `Property '${pathString}' was ${type} with value: ${addQuotesIfNeed(getComplexValueIfNeed(diff.value))}`;
        case 'removed':
          return `Property '${pathString}' was ${type}`;
        case 'updated':
          return `Property '${pathString}' was ${type}. From ${addQuotesIfNeed(getComplexValueIfNeed(diff.oldValue))} to ${addQuotesIfNeed(getComplexValueIfNeed(diff.newValue))}`;
        case 'withChildren':
          return fn({...diff.children}, path);
      }
    });
  };

  return fn({ ...object }).filter(Boolean).join('\n');
}
