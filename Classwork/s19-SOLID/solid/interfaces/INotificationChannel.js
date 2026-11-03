export class INotificationChannel {
    sendNotification(message, recipient) {
        throw new Error("Method 'sendNotification()' must be implemented.");
    }
}