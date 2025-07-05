const assert = require('assert')
const {add} = require('../app2')

describe('the add function', () => {
    it('should add two numbers together',() => {
        const result = add(2,2);
        assert.equal(result,4)
    })
})