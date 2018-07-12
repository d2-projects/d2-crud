function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    const res = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        res[key] = clone(value[key]);
      }
    }
    return res;
  }
  return value;
}

export default clone;
