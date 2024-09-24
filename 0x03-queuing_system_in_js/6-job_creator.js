import kue from 'kue';

const queue = kue.createQueue();


const jobData = { phoneNumber: '0723549412', message: 'This is the code to verify your account' };

const job = queue.create('push_notification_code', jobData).save((err) => {
    if (!err)
        { console.log(`Notification job created: ${job.id}`);}

  else {
    console.error(`Notification job failed`)
}
})
