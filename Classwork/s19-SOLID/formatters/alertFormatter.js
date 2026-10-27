export class AlertFormatter {
    static formatText(sensorData){
        return `[ALERT] Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
    }

    static formatHTML(sensorData){
        return
            <div style="border: 1px solid red; padding: 10px;">
                <h1>Alert</h1>
                <p>Sensor <b>${sensorData.id}</b> reached <i>${sensorData.reading}</i></p>
            </div>;
    }


    static formatSocialMedia(sensorData){
        return `🚨 ALERT: Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
    }
}

