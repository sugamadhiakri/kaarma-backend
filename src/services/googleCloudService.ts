import { Bucket, Storage } from "@google-cloud/storage";
import { UserInputError } from "apollo-server";
import { storage } from "config";
import { FileUpload } from "graphql-upload";
import { v4 as uuid } from "uuid";

export class GoogleCloudService {
    private static _instance: GoogleCloudService;
    private gc: Storage;
    private bucket: Bucket;

    private constructor() {
        this.gc = storage;
        this.bucket = this.gc.bucket(process.env.BUCKET || "");
    }

    public static get instance(): GoogleCloudService {
        if (GoogleCloudService._instance == null)
            GoogleCloudService._instance = new GoogleCloudService();

        return GoogleCloudService._instance;
    }

    public async uploadImage(file: Promise<FileUpload>) {

        const { filename, createReadStream } = await file;

        try {
            const tenMb = 10 * 1024 * 1024;
            await this.checkFileSize(createReadStream, tenMb);
        } catch (error: any) {
            if (typeof error === 'number') {
                throw new UserInputError('Maximum image size is 10MB');
            }
        }

        const uniqueFileName = this.generateUniqueFileName(filename);

        // upload to Google Cloud Storage
        try {
            await this.uploadToGoogleCloud(createReadStream, uniqueFileName);
        } catch (e) {
            throw new UserInputError('Error with uploading to Google Cloud');
        }


        return `https://storage.googleapis.com/${process.env.BUCKET}/${uniqueFileName}`;
    }

    private uploadToGoogleCloud(createReadStream: FileUpload["createReadStream"], filename: string) {
        return new Promise((resolves, rejects) =>
            createReadStream()
                .pipe(this.bucket.file(filename).createWriteStream({
                    resumable: false,
                    gzip: true
                }))
                .on('error', (err: any) => rejects(err)) // reject on error
                .on('finish', resolves));
    }

    private async checkFileSize(createReadStream: FileUpload["createReadStream"], maxSize: number) {

        new Promise((resolves, rejects) => {
            let filesize = 0;
            let stream = createReadStream();
            stream.on('data', (chunk: Buffer) => {
                filesize += chunk.length;
                if (filesize > maxSize) {
                    rejects(filesize);
                }
            });
            stream.on('end', () =>
                resolves(filesize)
            );
            stream.on('error', rejects);
        });
    }

    private generateUniqueFileName(name: string): string {
        const trimmed = name.replace(/\s+/g, `-`);
        const unique = uuid();

        return `${unique}-${trimmed}`;
    }

}

