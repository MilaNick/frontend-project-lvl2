import stylish from './stylish.js';
import plain from './plain.js';

export default (format) => {
  switch (format) {
    case 'stylish': {
      return stylish;
    }
    case 'plain': {
      return plain;
    }
    case 'json': {
      return JSON.stringify;
    }
    default: {
      return new Error(`Формата ${format} не существует`);
    }
  }
};
