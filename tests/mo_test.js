const assert = require('assert')

describe('Input Validations',() => {
    it('Validating Input', () => {
        const input = Number(139);
        console.log(input);
        if(isNaN(input) || !input){
            assert(false)
        }else if(!Number.isInteger(input)){
            assert(false)
        }
        else{
            assert(true)
        }
    })
})

