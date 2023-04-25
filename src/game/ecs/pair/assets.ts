export interface Interactions {
  actions: Array<{
    name: string;
    behavior: string;
    target: string;
  }>;
}

// const coffeeMakerEntity = world.createEntity();
// world.addComponent('interactions', coffeeMakerEntity, {
//   actions: [
//     {
//       name: 'Drink Coffee',
//       behavior: 'drinking_coffee',
//       target: 'kitchen'
//     }
//   ]
// });