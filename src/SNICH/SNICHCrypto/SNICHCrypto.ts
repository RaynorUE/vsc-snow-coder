import crypto = require('crypto');
import machineID = require('node-machine-id');

export class SNICHCrypto {


    constructor() {
    }

    getOAuthState() {
        return crypto.randomBytes(16).toString("hex");
    }

    encrypt(value: string) {
        let key = this.getKey();
        let iv = this.getIV();
        let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        let encrypted = Buffer.concat([cipher.update(value), cipher.final()]);


        return encrypted.toString('hex') + ":" + iv.toString('hex');
    }

    decrypt(value: string): string | undefined {
        if (value.indexOf(':') === 0) {
            console.error('Unable to decrypt. Does not look encrypted.');
            return;
        }

        let cryptoParts = value.split(':');
        let encrypted = Buffer.from(cryptoParts[0], 'hex');
        let iv = Buffer.from(cryptoParts[1], 'hex');

        let decryptedParts = [];
        let key = this.getKey();

        if (key && iv) {
            let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
            decryptedParts.push(decipher.update(encrypted));
            decryptedParts.push(decipher.final());
            return decryptedParts.join("");
        } else {
            return;
        }
    }


    private getKey(): Buffer {
        return crypto
            .createHash("sha256")
            .update(machineID.machineIdSync(true))
            .digest();
    }


    private getIV(): Buffer {
        return crypto.randomBytes(16);
    }
}