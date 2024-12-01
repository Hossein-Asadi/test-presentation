import { describe, it, expect, vi } from "vitest";
import { groupBy } from "./part1.js";

type PersonType = {
  name: string;
  age: number;
  gender: string;
};

const people: PersonType[] = [
  { name: "Hossein", age: 23, gender: "male" },
  { name: "Zahra", age: 25, gender: "female" },
  { name: "Ahmad", age: 23, gender: "male" },
  { name: "Kazem", age: 25, gender: "male" },
];

describe("test groupBy function", () => {
  it("test group people by age", () => {
    const expected = {
      23: [
        { name: "Hossein", age: 23, gender: "male" },
        { name: "Ahmad", age: 23, gender: "male" },
      ],
      25: [
        { name: "Zahra", age: 25, gender: "female" },
        { name: "Kazem", age: 25, gender: "male" },
      ],
    };

    const result = groupBy(people, (person) => person.age);

    expect(result).toEqual(expected);
  });

  it("test group people by name", () => {
    const expected = {
      Hossein: [{ name: "Hossein", age: 23, gender: "male" }],
      Zahra: [{ name: "Zahra", age: 25, gender: "female" }],
      Ahmad: [{ name: "Ahmad", age: 23, gender: "male" }],
      Kazem: [{ name: "Kazem", age: 25, gender: "male" }],
    };

    const result = groupBy(people, (person) => person.name);

    expect(result).toEqual(expected);
  });

  it("test group people by gender", () => {
    const expected = {
      male: [
        { name: "Hossein", age: 23, gender: "male" },
        { name: "Ahmad", age: 23, gender: "male" },
        { name: "Kazem", age: 25, gender: "male" },
      ],
      female: [{ name: "Zahra", age: 25, gender: "female" }],
    };

    const result = groupBy(people, (person) => person.gender);
    
    expect(result).toEqual(expected);
  });

  it("test handle grouping by a non-existing key", () => {
    const expected = {
      undefined: [
        { name: "Hossein", age: 23, gender: "male" },
        { name: "Zahra", age: 25, gender: "female" },
        { name: "Ahmad", age: 23, gender: "male" },
        { name: "Kazem", age: 25, gender: "male" },
      ],
    };

    const result = groupBy(people, (person) => (person as any).nonExistingKey);

    expect(result).toEqual(expected);
  });

  it("test return an empty object for an empty array", () => {
    const data: PersonType[] = [];

    const result = groupBy(data, (person) => person.age);

    expect(result).toEqual({});
  });

  it("test call the callback function the correct number of times", () => {
    const callback = vi.fn((person: PersonType) => person.age);

    groupBy(people, callback);

    expect(callback).toHaveBeenCalledTimes(people.length);
    people.forEach((person) => {
      expect(callback).toHaveBeenCalledWith(person);
    });
  });
});
