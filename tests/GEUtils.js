import * as GEUtils from '../js/GEUtils.js'

const testsWithResults = [
// equals
   ['GEUtils.equals([1],[1,2])', 'false'],
   ['GEUtils.equals([1,2],[1,3])', 'false'],
   ['GEUtils.equals([1,2],[1,2])', 'true'],
 // flatten
   ['GEUtils.flatten([1,[[2,3],4]])', '[1, 2, 3, 4]'],
// last
   ['GEUtils.last([1,2,3])', '3'],
// fromRainbow
   ['GEUtils.fromRainbow(0.8, 0.8, 0.8)', 'hsl(288, 80%, 80%)'],
// isTouchDevice
// cleanWindow
// ajaxLoad
// setupFauxSelect
// htmlToContext
]

describe('GEUtils tests', () => {
   testsWithResults.forEach(([test, rslt]) => {
      it(`${test} should be ${rslt}`, () => {
         chai.assert.equal(obj2string(eval(test)), rslt)
      })
   })
})
