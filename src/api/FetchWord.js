let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
export async function getData(word) {
  let res = await fetch(url + word);
  let data = await res.json();
  return data;
}
