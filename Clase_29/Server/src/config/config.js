import dotenv from 'dotenv';
import { Command } from 'commander'

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'dev')
program.parse();

console.log("Mode Options: ", program.opts().mode);

const enviroment = program.opts().mode

dotenv.config(
    {
        path: enviroment === "prod" ? "./src/config/.env.production" : "./src/config/.env.development"
    }
)

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}