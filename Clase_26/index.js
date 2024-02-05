import express from 'express'
import routerProduct from "./src/routes/product.router.js"


const app = express();
app.use(express.json())
const PORT = 8080;


// Router
app.use('/api', routerProduct)

app.listen(PORT, () => {
    console.log(`Sever run on port: ${PORT}`);
})

