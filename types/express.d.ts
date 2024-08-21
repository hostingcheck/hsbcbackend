import { IUser } from '../src/models/User';

declare module 'express' {
    export interface Request {
        user?: IUser; // Add an optional user property of type IUser to the Request interface
    }
}