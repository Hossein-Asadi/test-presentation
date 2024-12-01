"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = groupBy;
function groupBy(array, keyFn) {
    return array.reduce(function (result, item) {
        var key = keyFn(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {});
}
var people = [
    { name: "Hossein", age: 23, gender: "male" },
    { name: "Zahra", age: 25, gender: "female" },
    { name: "Ahmad", age: 23, gender: "male" },
    { name: "Kazem", age: 25, gender: "male" },
];
var groupByAge = groupBy(people, function (person) { return person.age; });
console.log(groupByAge);
var groupByGender = groupBy(people, function (person) { return person.gender; });
console.log(groupByGender);
