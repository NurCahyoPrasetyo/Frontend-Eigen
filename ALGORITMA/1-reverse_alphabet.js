const reverseAlphabet = (str) => {
  const text = str.match(/[A-Za-z]/g) || [];
  const digits = str.match(/[0-9]/g) || [];

  const reversText = text.reverse().join("");
  const result = reversText + digits.join("");

  return result;
};

const input = "NEGIE1";
const output = reverseAlphabet(input);
console.log(output);
