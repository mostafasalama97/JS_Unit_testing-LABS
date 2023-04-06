const { getLicenseValidity, transformArryToString } = require('../../src/helpers/utils');

const it = require('ava').default;

it("transformArryToString", () => {
    transformArryToString()
})


// hint useFakeTimer
it("getLicenseValidity", () => {
    getLicenseValidity()
})

//========================================================================================================
const { test } = require('ava');
const { expect } = require('chai');
test('transformArryToString should join array with the given delimiter', (t) => {
  const array = ['apple', 'orange', 'banana'];
  const delimiter = '-';
  const result = transformArryToString(delimiter, array);
  expect(result).to.equal('apple-orange-banana');
});

test('transformArryToString should return empty string when given an empty array', (t) => {
  const array = [];
  const delimiter = '-';
  const result = transformArryToString(delimiter, array);
  expect(result).to.equal('');
});

test('transformArryToString should throw an error when given an invalid delimiter', (t) => {
  const array = ['apple', 'orange', 'banana'];
  const delimiter = 123;
  expect(() => transformArryToString(delimiter, array)).to.throw('invalid delimeter');
});

test('transformArryToString should throw an error when delimiter is not provided', (t) => {
  const array = ['apple', 'orange', 'banana'];
  expect(() => transformArryToString(undefined, array)).to.throw('invalid delimeter');
});

test('transformArryToString should throw an error when array is not provided', (t) => {
  const delimiter = '-';
  expect(() => transformArryToString(delimiter)).to.throw('Cannot read property');
});

test('transformArryToString should throw an error when array is not an array', (t) => {
  const array = 'not an array';
  const delimiter = '-';
  expect(() => transformArryToString(delimiter, array)).to.throw('array is not an array');
});
//==============================================================================================
const sinon = require('sinon');
test('getLicenseValidity returns valid when current year is before 2026', (t) => {
  const clock = sinon.useFakeTimers(new Date('2022-01-01').getTime());
  const result = getLicenseValidity();
  expect(result).to.equal('valid');
  clock.restore();
});

test('getLicenseValidity returns invalid when current year is after 2025', (t) => {
  const clock = sinon.useFakeTimers(new Date('2026-01-01').getTime());
  const result = getLicenseValidity();
  expect(result).to.equal('invalid');
  clock.restore();
});
