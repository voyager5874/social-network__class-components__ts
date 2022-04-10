// const data = {
//   name: 'Gleb',
//   age: 30,
// };

// Use destructuring of incoming parameters
// export const someFunction = ({ name, age }) => {
// ...
// return `${name}/${age}`
// }

// someFunction(data);

const MAX_ID_NUMBER = 23000;
const MIN_ID_NUMBER = 3;

export const getRandomInteger = (
  min: number = MIN_ID_NUMBER,
  max: number = MAX_ID_NUMBER,
): number => Math.floor(Math.random() * max + min);
