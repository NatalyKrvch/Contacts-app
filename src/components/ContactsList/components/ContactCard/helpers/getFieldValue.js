export const getFieldValue = (fields, fieldName) => {
  return fields[fieldName]?.[0]?.value || '';
};