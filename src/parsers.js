import yaml from 'js-yaml';

const parse = (format, data) => {
  if (data === '') {
    return {};
  }
  switch (format) {
    case 'json':
      return JSON.parse(data) ?? {};
    case 'yml':
      return yaml.load(data) ?? {};
    case 'yaml':
      return yaml.load(data) ?? {};
    default:
      throw new Error(`Ошибка ${format}`);
  }
};
export default parse;
