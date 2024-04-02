import cors from 'cors';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';

import { log } from './middleware/log.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { loadFixtures } from './fixtures';
import { apiRouter } from './api/api.routes';


const env = process.env.ENV ?? 'dev';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const mongo_db_uri = 'mongodb://127.0.0.1:27017/wisdo-health';

const app = express();

/* enable logging */
app.use(log);

/* prepare application */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

/* enable swagger documentation */
if (env !== 'prod') {
  app.use('/api', express.static('./apps/wisdo-health-api/src/assets/swagger') );

  app.get('/api/swagger.json', (req: Request, res: Response ) => {
    let content = fs.readFileSync(`./apps/wisdo-health-api/src/swagger.json`);
    res.write( content )
    res.end()
    return;
  })
}

app.use(authMiddleware);
app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.status(404).send('404 Page not found');
})

const main = async() => {
  try {
    await mongoose.connect(mongo_db_uri);
    console.log('Connected to database');
  } catch (error) {
    console.log(`Error connecting to database ${mongo_db_uri}`, error);
    process.exit(1);
  }

  try {
    await loadFixtures();
    console.log('Testing data reset')
  } catch(error) {
    console.log(`Error loading database fixtures`, error);
  }

  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
}

main();


