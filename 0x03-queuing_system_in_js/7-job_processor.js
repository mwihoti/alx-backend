import kue from 'kue';

const queue = kue.createQueue();

const blacklistedNums = ['4153518780', '4153518781'];



function sendNotification(phoneNumber, message, job, done) {
    if (blacklistedNums.includes(phoneNumber)) {
      return done(Error(`Phone number ${phoneNumber} is blacklisted`));
    }
    job.progress(0, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    job.progress(50, 100);
    done();
  }
  queue.process('push_notification_code', (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
  });
