export class EmailService {
    sendEmail(to, subject, body) {
        console.log(`Sending email to ${to} with subject: ${subject}`);
        return true;
    }
}

export class NotificationManager {
    constructor(emailService) {
        this.emailService = emailService;
    }

    notifyUser(email, message) {
        if (!email || !message) {
            throw new Error("Email and message are required");
        }
        const subject = "Notification";
        const body = `Dear user,\n\n${message}`;
        return this.emailService.sendEmail(email, subject, body);
    }
}
