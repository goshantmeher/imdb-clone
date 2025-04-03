import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/routeHandler';
import { initSecurity } from './utils/security/securityHelper';
import authMiddleware from './utils/security/auth/authMiddleware';
import initMongoDB from './db/dbHelper';
import mongoose from 'mongoose';
const cookieParser = require('cookie-parser');

const app = express();
initSecurity(app);
app.use(cookieParser());
initMongoDB();
app.use(authMiddleware.decodeToken);

routes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   res.status(err.status || 500);
   res.send({
      error: {
         status: err.status || 500,
         message: err.message,
      },
   });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});

process.on('SIGINT', async () => {
   console.log('Server shutting down...');
   console.log('Closing MongoDB connection...');
   await mongoose.connection.close();
   console.log('MongoDB connection closed.');
   process.exit(0);
});
