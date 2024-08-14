const isBooleanString = (str) => {
  if (str === "true") return true;
  if (str === "false") return false;

  return null;
}

module.exports = isBooleanString;