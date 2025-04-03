import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export const initSecurity = (app: Application) => {
   //    app.use(express.json());
   app.use(cors());

   app.use(bodyParser.json({ limit: '1kb' }));
   app.use(bodyParser.urlencoded({ extended: true, limit: '1kb' }));

   /* CORS */
   app.options(/(.*)/, cors());
};
