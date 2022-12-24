const getRandom = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPassword = (numberAmount: number) => {
  let numbers = [];
  for (let i = 1; i <= numberAmount; i++) {
    numbers.push(getRandom(0, 9));
  }
  return numbers.join("");
};
