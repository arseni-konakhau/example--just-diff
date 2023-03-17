import { diff, jsonPatchPathConverter } from "just-diff";

// ========================================================
// OPTION 1
// ========================================================
const obj1 = { a: 4, b: 5 };
const obj2 = { a: 3, b: 5 };
const obj3 = { a: 4, c: 5 };

const jdTEST1 = diff(obj1, obj2);
// [
//   { "op": "replace", "path": ['a'], "value": 3 }
// ]

const jdTEST2 = diff(obj2, obj3);
// [
//   { "op": "remove", "path": ['b'] },
//   { "op": "replace", "path": ['a'], "value": 4 }
//   { "op": "add", "path": ['c'], "value": 5 }
// ]

// ========================================================
// OPTION 2
// ========================================================
// using converter to generate jsPatch standard paths
const jdTEST3 = diff(obj1, obj2, jsonPatchPathConverter);
// [{ op: "replace", path: "/a", value: 3 }];

const jdTEST4 = diff(obj2, obj3, jsonPatchPathConverter);
// [
//   { "op": "remove", "path": '/b' },
//   { "op": "replace", "path": '/a', "value": 4 }
//   { "op": "add", "path": '/c', "value": 5 }
// ]

// arrays
const obj4 = { a: 4, b: [1, 2, 3] };
const obj5 = { a: 3, b: [1, 2, 4] };
const obj6 = { a: 3, b: [1, 2, 4, 5] };

const jdTEST5 = diff(obj4, obj5);
// [
//   { "op": "replace", "path": ['a'], "value": 3 },
//   { "op": "replace", "path": ['b', 2], "value": 4 }
// ]

const jdTEST6 = diff(obj5, obj6);
// [
//   { "op": "add", "path": ['b', 3], "value": 5 }
// ]

// nested paths
const obj7 = { a: 4, b: { c: 3 } };
const obj8 = { a: 4, b: { c: 4 } };
const obj9 = { a: 5, b: { d: 4 } };

const jdTEST7 = diff(obj7, obj8);
// [
//   { "op": "replace", "path": ['b', 'c'], "value": 4 }
// ]

const jdTEST8 = diff(obj8, obj9);
// [
//   { "op": "replace", "path": ['a'], "value": 5 }
//   { "op": "remove", "path": ['b', 'c']}
//   { "op": "add", "path": ['b', 'd'], "value": 4 }
// ]

console.log('--------------------------------');
console.log(diff);
console.log('--------------------------------');
console.log(jdTEST1);
console.log(jdTEST2);
console.log(jdTEST3);
console.log(jdTEST4);
console.log(jdTEST5);
console.log(jdTEST6);
console.log(jdTEST7);
console.log(jdTEST8);
