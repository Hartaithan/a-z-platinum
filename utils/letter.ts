const specialChar = /[^\p{L}\p{N}]/u;
const asianChar = /[\u3040-\u30FF\u4E00-\u9FFF\u3400-\u4DBF]/;

export const recognizeLetter = (title: string) => {
  let letter = title[0];
  if (title.toLowerCase().startsWith("the ")) letter = title[4];
  if (!isNaN(Number(letter))) return "0";
  if (specialChar.test(letter)) return "#";
  if (asianChar.test(letter)) return "賞";
  return letter.toUpperCase();
};
