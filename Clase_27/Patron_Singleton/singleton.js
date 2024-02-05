
let instance = null

class SingletonClass {
    constructor() {
        this.value = Math.random(100)
    }


    static getInstance() {
        // Sin singleton
        // instance = new SingletonClass();
        // return instance

        // simulacion Con singleton
        if (!instance) {
            instance = new SingletonClass();
        }

        return instance
    }
}

module.exports = SingletonClass;

