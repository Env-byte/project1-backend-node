import {DefaultException} from "./defaultException.model";

export class BadRequestException extends DefaultException {
    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, additionalInfo: any = {}) {
        super(message, 400, additionalInfo);
    }
}