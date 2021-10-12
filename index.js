const file1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const file2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};
const genDiff = (obj1, obj2) => {
  const rows = [];
  const newSymbol = Symbol('replacement');
  const uniqKeys = (Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]))).sort();
  const joint = uniqKeys.reduce((acc, key) => {
    acc[key] = [(key in obj1) ? obj1[key] : newSymbol, (key in obj2) ? obj2[key] : newSymbol];
    return acc;
  }, {});
  uniqKeys.forEach((key) => {
    if (joint[key][0] === joint[key][1]) {
      rows.push(`  ${key}: ${joint[key][0]}`);
      return;
    }
    if (joint[key][0] === newSymbol) {
      rows.push(`+ ${key}: ${joint[key][1]}`);
      return;
    }
    if (joint[key][1] === newSymbol) {
      rows.push(`- ${key}: ${joint[key][0]}`);
      return;
    }
    if (joint[key][0] !== joint[key][1]) {
      rows.push(`- ${key}: ${joint[key][0]}`);
      rows.push(`+ ${key}: ${joint[key][1]}`);
    }
  });
  console.log(`{\n${rows.map((str) => `  ${str}`).join('\n')}\n}`);
};
genDiff(file1, file2);
