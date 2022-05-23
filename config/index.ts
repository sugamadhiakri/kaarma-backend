import { Storage } from "@google-cloud/storage";
import path = require("path");

const serviceKey = path.join(__dirname, './keys.json');

export const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'kaarma-347413',
});