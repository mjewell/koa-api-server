import applyHash from '../applyHash';

export default (model, fieldName) => {
  if (!model.changed(fieldName)) {
    return null;
  }

  return applyHash(model[fieldName])
    .then(token => {
      model[fieldName] = token;
    });
};
