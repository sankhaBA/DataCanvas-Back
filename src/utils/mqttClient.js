const mqtt = require('mqtt');
const mqttDataGatheringController = require('../controllers/mqttDataGatheringController');

const client = mqtt.connect('mqtt://192.248.11.35:1883');

client.on('connect', () => {
  client.subscribe('project/+/data', (err) => {
    if (err) {
      console.error('Failed to subscribe to topic:', err);
    } else {
      console.log('Subscribed to topic: project/+/data');
    }
  });
});

client.on('message', async (topic, message) => {
  console.log(`Received message from ${topic}: ${message.toString()}`);

  const tokens = topic.split('/');
  const projectID = tokens[1];

  const data = JSON.parse(message.toString());

  const requestData = {
    project_id: projectID,
    mqtt_key: data.mqttKey,
    fingerprint: data.deviceID,
    table: data.table,
    data: data.data
  };

  try {
    if (validateFields(requestData)) {
      const result = await mqttDataGatheringController.insertData(requestData);
      console.log(result);
    } else {
      console.error('Validation failed', requestData);
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
});

// check if all required fields are present
function validateFields(data) {
  const { project_id, mqtt_key, fingerprint, table, data: payload } = data;
  return project_id && fingerprint && table && payload;
}

module.exports = client;
