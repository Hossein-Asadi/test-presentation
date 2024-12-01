export function groupBy<T, K extends keyof any>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

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

const groupByAge = groupBy(people, (person) => person.age);
console.log(groupByAge);

const groupByGender = groupBy(people, (person) => person.gender);
console.log(groupByGender);
