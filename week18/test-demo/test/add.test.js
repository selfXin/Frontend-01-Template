import  assert from 'assert';
import {add} from '../src/add.js';

// var  assert = require('assert');
// var add = require('../src/add.js');


describe('add', function () {
    it('add(3,4) shoule be 7', function () {
      assert.equal(add(3,4),7);
    });
});
