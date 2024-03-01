import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {router} from "./src/routes/app";
import {swaggerDoc} from "./src/config/swagger";

const app = express();
const port = process.env.port || 3000
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }))

app.use('/', router)

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
