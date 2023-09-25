import * as Template from '../js/Template.js'

const testsWithResults = [
   ["Template.HTML('testTemplate')", '`Test template`'],
   ["Template.HTML('missingTestTemplate') === undefined", 'true'],
]

describe('Template tests', () => {
   testsWithResults.forEach(([test, rslt]) => {
      it(`${test} should be ${rslt}`, () => {
         chai.assert.equal(obj2string(eval(test)), rslt)
      })
   })
})
