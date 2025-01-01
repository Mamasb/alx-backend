import kue from 'kue';  // Use dynamic import for ES module

describe('Job creation in kue', function() {
  it('should create a job in the queue', function(done) {
    const queue = kue.createQueue();
    const job = { phoneNumber: '123456789', message: 'Test message' };

    queue.create('push_notification_code', job).save((err) => {
      if (err) done(err);
      queue.testMode.jobs.length.should.equal(1); // Checking job length
      done();
    });
  });
});
