import crypto = require('crypto');
import machineID = require('node-machine-id');

export class SNICHCrypto {


    constructor() {
    }

    encrypt(value: string) {
        let key = this.getKey();
        let encryptedParts = [];
        let iv = this.getIV();
        let cipher = crypto.createCipheriv("aes256", key, iv);
        encryptedParts.push(cipher.update(value, "binary", "hex"));
        encryptedParts.push(cipher.final("hex"));

        return encryptedParts.join("") + ":" + iv.toString('hex');
    }

    decrypt(value: string): string | undefined {
        if (value.indexOf(':') === 0) {
            console.error('Unable to decrypt. Does not look encrypted.');
            return;
        }

        let cryptoParts = value.split(':');
        let encrypted = cryptoParts[0];
        let iv = Buffer.from(cryptoParts[1], 'hex');

        let decryptedParts = [];
        let key = this.getKey();

        if (key && iv) {
            let decipher = crypto.createDecipheriv("aes256", key, iv);
            decryptedParts.push(decipher.update(encrypted, "hex", "binary"));
            decryptedParts.push(decipher.final("binary"));
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