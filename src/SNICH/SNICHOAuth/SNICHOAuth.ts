import { SNICHOAuthWebServer } from '../SNICHWebServer/SNICHWebServer';

export class SNICHOAuth {
    constructor() { }

    async getOAuth() {
        return await new SNICHOAuthWebServer().listen('abc123');
    }
}