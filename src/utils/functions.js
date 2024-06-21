export function getDefs(word) {
  let defs = word.meanings.map((w) => w.definitions);
  return defs.flat();
}
