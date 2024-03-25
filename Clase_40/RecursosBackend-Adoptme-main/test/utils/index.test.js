import chai from 'chai';
import { createHash, passwordValidation } from '../../src/utils/index.js';

const expect = chai.expect

describe('Test de la libreria bcrypt de Utils', () => {

    // before

    // beforeEach

    it("La funcion de encriptacion debe generar un password encriptado", async function () {

        // Given
        const passwordTest = "123qwe"


        // Then
        const result = await createHash(passwordTest)
        console.log(result);

        // Assert that
        expect(result).not.equal(passwordTest)
        expect(result).not.to.be.NaN
        expect(result).not.to.be.undefined
        expect(result).not.to.be.null
        expect(result).not.to.be.empty
    })
})