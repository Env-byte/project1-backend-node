import {DefaultException} from "./defaultException.model";

export class NotFoundException extends DefaultException {
    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, additionalInfo: any = {}) {
        super(message, 404, additionalInfo);
    }
}