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
export const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * max + min);
