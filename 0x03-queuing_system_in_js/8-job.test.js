import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
    let queue;
  
    // Before each test, set up a new queue and enter test mode
    beforeEach(() => {
      queue = kue.createQueue();
      queue.testMode.enter(); // Enter test mode for Kue
    });
  
    // After each test, clear the queue and exit test mode
    afterEach(() => {
      queue.testMode.clear(); // Clear the test mode queue
      queue.testMode.exit();  // Exit test mode
    });
  
    it('should display an error message if jobs is not an array', () => {
      expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs is not an array');
    });
  
    it('should create two new jobs to the queue', () => {
        const jobs = [
          {
            id: 1, // Add an id to the first job
            phoneNumber: '4153518780',
            message: 'This is the code 1234 to verify your account',
          },
          {
            id: 2, // Add an id to the second job
            phoneNumber: '4153518781',
            message: 'This is the code 4562 to verify your account',
          }
        ];
      
        createPushNotificationsJobs(jobs, queue);
      
        // Validate that 2 jobs were added to the queue
        expect(queue.testMode.jobs.length).to.equal(2);
      
        // Check the data of the first job
        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
      
        // Check the data of the second job
        expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
      });
    });      