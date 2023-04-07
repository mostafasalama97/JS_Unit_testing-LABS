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
const { it } = require('ava');
const { expect } = require('chai');
it('transformArryToString should join expArr with the given delimiter', (t) => {
  const expArr = ['apple', 'orange', 'banana'];
  const delimiter = '-';
  const result = transformArryToString(delimiter, expArr);
  expect(result).to.equal('apple-orange-banana');
  // console.log(result)

});

it('transformArryToString should return empty string when given an empty expArr', (t) => {
  const expArr = [];
  const delimiter = '-';
  const result = transformArryToString(delimiter, expArr);
  expect(result).to.equal('');
});

it('transformArryToString should throw an error when given an invalid delimiter', (t) => {
  const expArr = ['apple', 'orange', 'banana'];
  const delimiter = 123;
  expect(() => transformArryToString(delimiter, expArr)).to.throw('invalid delimeter');
});

it('transformArryToString should throw an error when delimiter is not provided', (t) => {
  const expArr = ['apple', 'orange', 'banana'];
  expect(() => transformArryToString(undefined, expArr)).to.throw('invalid delimeter');
});

it('transformArryToString should throw an error when expArr is not provided', (t) => {
  const delimiter = '-';
  expect(() => transformArryToString(delimiter)).to.throw('Cannot read property');
});

it('transformArryToString should throw an error when expArr is not an expArr', (t) => {
  const expArr = 'not an expArr';
  const delimiter = '-';
  expect(() => transformArryToString(delimiter, expArr)).to.throw('expArr is not an expArr');
});
//==============================================================================================
const sinon = require('sinon');
it('getLicenseValidity returns valid when current year is before 2026', (t) => {
  const clock = sinon.useFakeTimers(new Date('2022-01-01').getTime());
  const result = getLicenseValidity();
  expect(result).to.equal('valid');
  clock.restore();
});

it('getLicenseValidity returns invalid when current year is after 2025', (t) => {
  const clock = sinon.useFakeTimers(new Date('2026-01-01').getTime());
  const result = getLicenseValidity();
  expect(result).to.equal('invalid');
  clock.restore();
});
