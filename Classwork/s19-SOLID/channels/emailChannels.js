import { INotificationChannel } from "../interfaces/INotificationChannel.js";

export class EmailChannel extends INotificationChannel {
    async send(recipient, payload) {
        console.log(`Sending Email to ${recipient}: ${payload.htmlBody}`);
        return { success: true, channel: 'EMAIL' };
    }
}