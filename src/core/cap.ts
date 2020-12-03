// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const cap = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
