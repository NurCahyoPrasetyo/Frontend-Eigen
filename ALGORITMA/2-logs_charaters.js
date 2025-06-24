const longest = (sentence) => {
  const words = sentence.split(" ");
  let longWord = "";

  for (const word of words) {
    if (word.length > longWord.length) {
      longWord = word;
    }
  }

  console.log(`${longWord}: ${longWord.length} character`);
  return longWord;
};

const sentence = "Saya sangat senang mengerjakan soal algoritma";
longest(sentence);
