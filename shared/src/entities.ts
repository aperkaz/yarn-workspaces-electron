export class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  toString() {
    return `Shared entity: ${this.name}, age ${this.age}`;
  }
}
