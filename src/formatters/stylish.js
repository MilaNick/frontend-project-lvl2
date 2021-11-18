const getObjAsString = (obj) => JSON.stringify(obj, null, 4)
  .replaceAll('"', '')
  .replaceAll('\n', '\n    ')
  .replaceAll(',\n', '\n');

export default function stylish(obj, isFirstIteration = false) {
  const rows = [];
  const entries = Object.entries(obj);
  entries.forEach((pair) => {
    const key = pair[0];
    const diff = pair[1];
    const { type } = diff;
    if (type) {
      if (typeof diff.value1 === 'object' && diff.value1) {
        diff.value1 = getObjAsString(diff.value1);
      }
      if (typeof diff.value2 === 'object' && diff.value2) {
        diff.value2 = getObjAsString(diff.value2);
      }
      switch (type) {
        case 'added':
          rows.push(`+ ${key}: ${diff.value2}`);
          return;
        case 'removed':
          rows.push(`- ${key}: ${diff.value1}`);
          return;
        case 'updated':
          rows.push(`- ${key}: ${diff.value1}`);
          rows.push(`+ ${key}: ${diff.value2}`);
          return;
        case 'notUpdated':
          rows.push(`  ${key}: ${diff.value1}`);
      }
    } else {
      rows.push(`  ${key}: ${stylish(diff)}`);
    }
  });
  return (`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`)
    .split('\n')
    .join(isFirstIteration ? '\n' : '\n    ');
}
