
import nodemailer, { Transporter } from "nodemailer";

export class MailingService {
    private static _instance: MailingService;
    private transporter: Transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAILING_EMAIL,
                pass: process.env.MAILING_PASSWORD
            }
        });
    }

    public static get instance(): MailingService {
        if (MailingService._instance == null)
            MailingService._instance = new MailingService();

        return MailingService._instance;
    }

    public async sendMail(to: string, subject: string, message: string) {
        const mailOption = {
            from: process.env.MAILING_EMAIL,
            to: to,
            subject: subject,
            text: message
        };

        this.transporter.sendMail(mailOption, (err, data) => {
            if (err) {
                console.log("error aayo yar");
                console.log(err.message);
            }

            if (data) {
                console.log("Here is what I found");
                console.log(data);
            }
        });
    }
}