import {DefaultException} from "./defaultException.model";

export class UnauthorisedException extends DefaultException {
    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, additionalInfo: any = {}) {
        super(message, 401, additionalInfo);
    }
}