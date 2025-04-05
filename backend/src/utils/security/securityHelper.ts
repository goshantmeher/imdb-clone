import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export const initSecurity = (app: Application) => {
   //    app.use(express.json());
   app.use(
      cors({
         origin: 'http://localhost:5173',
         methods: ['GET', 'POST', 'PUT', 'DELETE'],
         credentials: true,
      }),
   );

   app.use(bodyParser.json({ limit: '2kb' }));
   app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));

   /* CORS */
   app.options(/(.*)/, cors());
};
