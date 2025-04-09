import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export const initSecurity = (app: Application) => {
   app.use(
      cors({
         origin: process.env.allow_origin?.split(',') || '',
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
         credentials: true,
      }),
   );

   app.use(bodyParser.json({ limit: '10kb' }));
   app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));

   app.options(/(.*)/, cors());
};
