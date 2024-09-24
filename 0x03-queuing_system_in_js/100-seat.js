import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const app = express();
const queue = kue.createQueue();
let reservationEnabled = true;

const reserveSeat = async (number) => {
    await setAsync(`available_seats`, number);
};

const getCurrentAvailableSeats = async () => {
    return await getAsync('available_seats');
  };
  
  reserveSeat(50);
  app.get('/available_seats', async (req, res) => {
    const availableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: availableSeats });
  })

  app.get('/reserve_seat', (req, res) => {
    if (!reservationEnabled) {
      return res.json({ status: 'Reservation are blocked' });
    }
  
    const job = queue.create('reserve_seat').save((err) => {
      if (!err) {
        return res.json({ status: 'Reservation in process' });
      }
      res.json({ status: 'Reservation failed' });
    });
  });
  
  // Process queue
  app.get('/process', (req, res) => {
    res.json({ status: 'Queue processing' });
  
    queue.process('reserve_seat', async (job, done) => {
      let availableSeats = await getCurrentAvailableSeats();
      availableSeats = parseInt(availableSeats);
  
      if (availableSeats <= 0) {
        reservationEnabled = false;
        return done(new Error('Not enough seats available'));
      }
  
      await reserveSeat(availableSeats - 1);
      done();
      if (availableSeats - 1 === 0) reservationEnabled = false;
    });
  });
  
  app.listen(1245, () => {
    console.log('Server running on port 1245');
  });