export class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Shared module, ${this.name}, age ${this.age}`;
  }
}

export * as API from './API';
