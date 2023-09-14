import BitSet from '../js/BitSet.js'

const testsWithResults = [
// constructor
   ['new BitSet(0)', '{len: 0, arr: []}'],
   ['new BitSet(1)', '{len: 1, arr: [0]}'],
   ['new BitSet(1,[0])', '{len: 1, arr: [1]}'],
   ['new BitSet(4,[1,3])', '{len: 4, arr: [a]}'],
   ['new BitSet(32,[0,31])', '{len: 32, arr: [80000001]}'],
   ['new BitSet(33,[0,31,32])', '{len: 33, arr: [80000001, 1]}'],
   ['new BitSet(64,[0,31,32,63])', '{len: 64, arr: [80000001, 80000001]}'],
// parseJSON
   ['Array.isArray(BitSet.parseJSON({len: 0, arr: []}).arr)', 'false'],
   ['BitSet.parseJSON({len:0, arr:[]})', '{len: 0, arr: []}'],
   ['BitSet.parseJSON({len: 1, arr: [0]})', '{len: 1, arr: [0]}'],
   ['BitSet.parseJSON({len: 1, arr: [1]})', '{len: 1, arr: [1]}'],
   ['BitSet.parseJSON({len: 4, arr: [10]})', '{len: 4, arr: [a]}'],
   ['BitSet.parseJSON({len: 32, arr: [0x80000001]})', '{len: 32, arr: [80000001]}'],
   ['BitSet.parseJSON({len: 33, arr: [0x80000001, 1]})', '{len: 33, arr: [80000001, 1]}'],
   ['BitSet.parseJSON({len: 64, arr: [0x80000001, 0x80000001]})', '{len: 64, arr: [80000001, 80000001]}'],
// toJSON
   ['JSON.stringify(new BitSet(0))', '{"len":0,"arr":[]}'],
   ['JSON.stringify(new BitSet(1))', '{"len":1,"arr":[0]}'],
   ['JSON.stringify(new BitSet(1,[0]))', '{"len":1,"arr":[1]}'],
   ['JSON.stringify(new BitSet(4,[1,3]))', '{"len":4,"arr":[10]}'],
   ['JSON.stringify(new BitSet(32,[0,31]))', '{"len":32,"arr":[2147483649]}'],
   ['JSON.stringify(new BitSet(33,[0,31,32]))', '{"len":33,"arr":[2147483649,1]}'],
   ['JSON.stringify(new BitSet(64,[0,31,32,63]))', '{"len":64,"arr":[2147483649,2147483649]}'],
// intersection
   ['BitSet.intersection(new BitSet(32,[1,3,31]), new BitSet(32,[2,3,31]))', '{len: 32, arr: [80000008]}'],
   ['new BitSet(32,[1,3,31]).intersection(new BitSet(32,[2,3,31]))', '{len: 32, arr: [80000008]}'],
// union
   ['BitSet.union(new BitSet(32,[1,3,31]), new BitSet(32,[2,3,31]))', '{len: 32, arr: [8000000e]}'],
   ['new BitSet(32,[1,3,31]).union(new BitSet(32,[2,3,31]))', '{len: 32, arr: [8000000e]}'],
// difference
   ['BitSet.difference(new BitSet(32,[1,3,31]), new BitSet(32,[2,3,31]))', '{len: 32, arr: [2]}'],
   ['new BitSet(32,[1,3,31]).difference(new BitSet(32,[2,3,31]))', '{len: 32, arr: [2]}'],
   ['new BitSet(32,[1,3,31]).difference(new BitSet(32,[2,3]))', '{len: 32, arr: [80000002]}'],
   ['new BitSet(32,[1,3]).difference(new BitSet(32,[2,3,31]))', '{len: 32, arr: [2]}'],
   ['new BitSet(32,[1,3]).difference(new BitSet(32,[2,3]))', '{len: 32, arr: [2]}'],
// complement
   ['new BitSet(32,[1,3,31]).complement()', '{len: 32, arr: [7ffffff5]}'],
// clone
   ['new BitSet(32,[1,3,31]).clone()', '{len: 32, arr: [8000000a]}'],
// clearAll
   ['new BitSet(32,[1,3,31]).clearAll()', '{len: 32, arr: [0]}'],
// setAll
   ['new BitSet(32,[1,3,31]).setAll()', '{len: 32, arr: [ffffffff]}'],
// get
   ['new BitSet(32,[1,3,31]).get(1)', '1'],
   ['new BitSet(32,[1,3,31]).get(2)', '0'],
// set
   ['new BitSet(32,[0]).set(31)', '{len: 32, arr: [80000001]}'],
// clear
   ['new BitSet(32,[1,3,31]).clear(3)', '{len: 32, arr: [80000002]}'],
// isEmpty
   ['new BitSet(0).isEmpty()', 'true'],
   ['new BitSet(32).isEmpty()', 'true'],
   ['new BitSet(32,[0]).isEmpty()', 'false'],
// isSet
   ['new BitSet(32,[0]).isSet(0)', 'true'],
   ['new BitSet(32,[0]).isSet(1)', 'false'],
// pop
   ['new BitSet(32,[1,3,31]).pop()', '1'],
   ['(() => {const x = new BitSet(32,[1,3,31]); x.pop(); return x})()', '{len: 32, arr: [80000008]}'],
// first
   ['new BitSet(32,[1,3,31]).first()', '1'],
   ['(() => {const x = new BitSet(32,[1,3,31]); x.first(); return x})()', '{len: 32, arr: [8000000a]}'],
// equals
   ['new BitSet(32,[0]).equals(new BitSet(32,[0]))', 'true'],
   ['new BitSet(32,[0]).equals(new BitSet(32,[1]))', 'false'],
   ['new BitSet(32,[0]).equals(new BitSet(31,[0]))', 'false'],
// popcount
   ['new BitSet(32,[1,3,31]).popcount()', '3'],
// contains
   ['new BitSet(32,[0,1]).contains(new BitSet(32,[1]))', 'true'],
   ['new BitSet(32,[0,1]).contains(new BitSet(32,[2]))', 'false'],
// add
   ['new BitSet(32,[1,3,31]).add(new BitSet(32,[2,3,31]))', '{len: 32, arr: [8000000e]}'],
// subtract
   ['new BitSet(32,[1,3,31]).subtract(new BitSet(32,[2,3,31]))', '{len: 32, arr: [2]}'],
// toArray
   ['new BitSet(64,[1,3,32,63]).toArray()', '[1, 3, 32, 63]'],
// toString
   ['new BitSet(64,[1,3,32,63]).toString()', '1,3,32,63'],
// toBitString
   ['new BitSet(4,[1,3]).toBitString().trim()', '0101'],
   ['new BitSet(32,[0,31]).toBitString().trim()', '10000 00000 00000 00000 00000 00000 01'],
   ['new BitSet(33,[0,31,32]).toBitString().trim()', '10000 00000 00000 00000 00000 00000 011'],
   ['new BitSet(64,[0,31,32,63]).toBitString().trim()',
      '10000 00000 00000 00000 00000 00000 01100 00000 00000 00000 00000 00000 0001'],
// allElements
   ['new BitSet(3, [0,1,2]).allElements().next().value', '0'],
]

describe('BitSet tests', () => {
   testsWithResults.forEach(([test, rslt]) => {
      it(`${test} should be ${rslt}`, () => {
         chai.assert.equal(obj2string(eval(test)), rslt)
      })
   })
})
