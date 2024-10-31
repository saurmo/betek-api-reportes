

// Crear servicio web - API
// En otras palabras levantar en express

import express from 'express'
import { router } from './src/infrastructure/api/index.routes'

const main = () => {

    const app = express()

    app.use(router)

    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log('Api reportes escuchando en: ', PORT);
    })
}

main()
