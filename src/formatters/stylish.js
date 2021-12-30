const getValueAsString = (value, iteration) => {
  if (['number', 'string', 'boolean', 'undefined'].includes(typeof value) || value === null) {
    return value;
  }
  const rows = Object.entries(value).reduce((acc, item) => {
    acc.push(`${item[0]}: ${getValueAsString(item[1], iteration + 1)}`);
    return acc;
  }, [])
  return (`{\n${rows.map((str) => `${' '.repeat(iteration * 4)}${str}`).join('\n')}\n${' '.repeat((iteration - 1) * 4)}}`)
}

export default function stylish(obj, iteration = 1) {
  const rows = Object.entries(obj).reduce((acc, pair) => {
    const [key, diff] = pair;
    const nextIteration = iteration + 1;
    switch (diff.type) {
      case 'withChildren': return [...acc, `  ${key}: ${stylish(diff.children, nextIteration)}`];
      case 'added': return [...acc, `+ ${key}: ${getValueAsString(diff.value, nextIteration)}`];
      case 'removed': return [...acc, `- ${key}: ${getValueAsString(diff.value, nextIteration)}`];
      case 'updated': return [...acc, `- ${key}: ${getValueAsString(diff.oldValue, nextIteration)}`, `+ ${key}: ${getValueAsString(diff.newValue, nextIteration)}`];
      case 'notUpdated': return [...acc, `  ${key}: ${getValueAsString(diff.value, nextIteration)}`];
      default: return [...acc];
    }
  }, []);
  const space = ' '.repeat((iteration - 1) * 4);
  return (`{\n${rows.map((str) => `  ${space}${str}`).join('\n')}\n${space}}`)
}
