import kue from 'kue';

const queue = kue.createQueue();

function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');

    jobs.forEach((job) => {
        // Validate the presence of phoneNumber and message
        if (!job.phoneNumber || !job.message) {
            throw new Error('Missing phoneNumber or message');
        }

        const jobPush = queue.create('push_notification_code_3', job).save((err) => {
            if (!err) {
                console.log(`Notification job created: ${jobPush.id}`);
            }
        });

        jobPush.on('complete', () => {
            console.log(`Notification job ${jobPush.id} completed`);
        });

        jobPush.on('failed', (err) => {
            console.log(`Notification job ${jobPush.id} failed: ${err}`);
        });

        jobPush.on('progress', (progress) => {
            console.log(`Notification job ${jobPush.id} ${progress}% complete`);
        });
    });
}

export default createPushNotificationsJobs;
