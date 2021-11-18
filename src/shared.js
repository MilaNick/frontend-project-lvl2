export const isCorrectType = (type) => ['added', 'removed', 'updated', 'notUpdated'].includes(type);

export const isDiffObject = (obj) => (
  'value1' in obj
    && 'value2' in obj
    && 'type' in obj
    && isCorrectType(obj.type)
);
