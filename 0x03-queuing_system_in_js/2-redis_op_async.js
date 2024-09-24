import redis from 'redis';
import { promisify } from 'util';
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');

});
client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

const getAsync = promisify(client.get).bind(client);


function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {

    try {
        
        const reply = await getAsync(schoolName);
        console.log(reply);
    }
    catch (error) {
        console.error(`Error fetching value: ${error.message}`);
        return;
    }

}

(async () => {
    setNewSchool("Holberton", "School "); // Set a value for 'Holberton'
    await displaySchoolValue('Holberton'); // should display school
    setNewSchool('HolbertonSanFrancisco', '100'); // Set a value for 'HolbertonSanFrancisco'
    await displaySchoolValue('HolbertonSanFrancisco'); // Should display '100'

})();