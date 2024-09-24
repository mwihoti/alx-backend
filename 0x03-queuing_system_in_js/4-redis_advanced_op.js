import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');

})
client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
})

let schools = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2
}

function myHash() {
    Object.entries(schools).forEach(([key, value]) => {
        client.hset('HolbertonSchools', key, value, redis.print);})
    }

function displayMyHash() {
    client.hgetall('HolbertonSchools', (err, object) => {
        if (err) {
            console.error(`Error fetching value: ${err.message}`);
            return;
        }
        console.log(object);
    })
}

// calling functions
myHash()
displayMyHash()