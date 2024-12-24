import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    // Todos los providers que declare dentro de mi modulo, deben estar registrados aqui
    // Le indica a Nest que debe ser manejado por el contenedor de inyeccion
    providers: [AxiosAdapter], 
    exports: [AxiosAdapter]
})
export class CommonModule { }
