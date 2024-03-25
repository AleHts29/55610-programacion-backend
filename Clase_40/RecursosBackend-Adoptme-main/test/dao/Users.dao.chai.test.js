import mongoose from "mongoose";
import UserDao from '../../src/dao/Users.dao.js'
import chai from 'chai'


mongoose.connect(`mongodb://localhost:27017/clase40-adoptme-test?retryWrites=true&w=majority`)

const expect = chai.expect

describe('Testing User Dao', () => {
    before(function () {
        this.userDao = new UserDao()
    })

    beforeEach(function () {
        this.timeout(5000) // time de espera ya que estamos usando una DB
        mongoose.connection.collections.users.drop();
    })

    it('El dao debe devolver los usuarios en forma de arreglo', async function () {
        // Given
        // console.log(this.userDao);
        const isArray = []

        // Then
        const result = await this.userDao.get()

        // Assert that
        expect(result).to.be.deep.equal(isArray)
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equal(true);
        expect(result.length).to.be.deep.equal(isArray.length);
    })


    it('El dao debe agregar el usuario correctamente a la DB', async function () {
        // Given
        let mockUser = {
            first_name: "Usuario Test 01",
            last_name: "Apellido Test 01",
            email: "test01@test.com",
            password: "123qwe",
        }

        // Then
        const result = await this.userDao.save(mockUser)
        // console.log(result);

        // Assert that
        expect(result._id).to.be.ok
    })

    afterEach(function () {
        mongoose.connection.collections.users.drop();
    })

})



// se ejecuta con: npx mocha test/dao/Users.dao.test.js