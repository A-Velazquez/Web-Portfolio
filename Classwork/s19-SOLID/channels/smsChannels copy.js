import { INotificationChannel } from "../interfaces/INotificationChannel.js";

export class smsChannel extends INotificationChannel {
    async send(recipient, payload) {
        console.log(`Sending SMS to ${recipient}: ${payload.textbody}`);
        return { success: true, channel: 'SMS' };
    }
}