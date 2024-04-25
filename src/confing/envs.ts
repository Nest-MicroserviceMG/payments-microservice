import 'dotenv/config';
import * as joi from 'joi';

//para ver como seran las variables de entorno
interface EnvVars {
  PORT: number;
  STRIPE_SECRET: string;
}

//defino el esquema de las variables de entorno para validarlas
const envsSchema = joi
  .object({
    PORT: joi.number().required(), //valida que sea un numero,
    STRIPE_SECRET: joi.string().required(), //valida que sea un string
  })
  .unknown(true); //acepta otras variables que no esten definidas

//saco el error y el valor de las variables de entorno
const { error, value } = envsSchema.validate({
  ...process.env,
});

//si hay un error, lanzo un error
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

//asigno las variables de entorno a una constante
const envVars: EnvVars = value;

//exporto las variables de entorno
export const envs = {
  port: envVars.PORT,
  stripreSecret: envVars.STRIPE_SECRET,
};
