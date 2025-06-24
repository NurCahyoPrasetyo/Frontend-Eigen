const queryMatches = (input, query) => {
  let result = [];

  query.map((item) => {
    const res = input.filter((word) => word === item).length;
    result.push(res);
  });

  return result;
};

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

const OUTPUT = queryMatches(INPUT, QUERY);
console.log(OUTPUT);
