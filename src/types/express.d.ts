import { IUser } from '../models/User'; // Adjust the import path as needed

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}