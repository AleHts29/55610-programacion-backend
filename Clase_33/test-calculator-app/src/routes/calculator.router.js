import { Router } from 'express';
import calculator from 'calculator-c33-app';

const router = Router()

// POST SUMA
router.post("/sum", (req, res) => {
    const { num1, num2 } = req.body
    const result = calculator.sum(num1, num2)
    res.send({ status: 'success', result: result })
})


// POST Div
router.post("/divide", (req, res) => {
    try {
        const { num1, num2 } = req.body
        const result = calculator.divide(num1, num2)
        res.send({ status: 'success', result: result })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

export default router;