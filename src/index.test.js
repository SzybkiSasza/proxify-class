jest.mock('./methods/proxify-class');
jest.mock('./methods/proxify-function');

import index from './';
import {proxifyClass, proxifyFunction} from './index';

const indexRequire = require('./');

describe('Main lib tests', () => {
  it('Exposes default export', () => {
    expect(Object.keys(index)).toEqual(['proxifyClass', 'proxifyFunction']);
  });

  it('Exposes two functions', () => {
    expect(proxifyClass).toBeInstanceOf(Function);
    expect(proxifyFunction).toBeInstanceOf(Function);
  });

  it('Exposes conventional require-compatible library', () => {
    expect(indexRequire.proxifyClass).toBeInstanceOf(Function);
    expect(indexRequire.proxifyFunction).toBeInstanceOf(Function);
  });
});
