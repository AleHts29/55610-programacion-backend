import config from '../config/config.js';
import MongoSingleton from '../config/mongodb-singleton.js';

let studentService;
let coursesService;

async function initializeMongoService() {
    console.log("Iniciando Servicio para Mongo!!");
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}


switch (config.persistence) {
    case 'mongodb':
        initializeMongoService();
        const { default: StudentServiceMongo } = await import('./dao/mongo/students.service.js')
        studentService = new StudentServiceMongo
        console.log("Servicio de estudiantes cargado:");
        console.log(studentService);

        const { default: CoursesServiceMongo } = await import('./dao/mongo/courses.service.js')
        coursesService = new CoursesServiceMongo
        console.log("Servicio de estudiantes cargado:");
        console.log(coursesService);
        break;

    case 'file':
        // IMPORTARME le DAO
        const { default: StudentServiceFileSystem } = await import('./dao/filesystem/students.service.js')
        studentService = new StudentServiceFileSystem
        console.log("Servicio de estudiantes cargado:");
        console.log(studentService);

        const { default: CoursesServiceFileSystem } = await import('./dao/filesystem/courses.service.js')
        coursesService = new CoursesServiceFileSystem
        console.log("Servicio de estudiantes cargado:");
        console.log(coursesService);
        break;

    default:
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); // Salir con código de error
        break;
}

export { studentService, coursesService };
