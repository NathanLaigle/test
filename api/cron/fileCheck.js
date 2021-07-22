const CronJob = require('cron').CronJob;

const App = require('../models/App');
const vtHashCheck = require('../utils/virusTotalHashCheck');

// Every 4 min
const job = new CronJob('* */20 * * * *', async () => {
  try {
    const apps = await App.findAll({
      where: {
        status: 'unverified',
      },
      limit: 4,
    });
    apps.forEach(async (app) => {
      try {
        const response = await vtHashCheck(app);
        const newStatus =
          response.positives === 0 ? 'secured' : 'threat detected';
        await app.update({
          status: newStatus,
        });
        console.log(app);
      } catch (error) {
        console.log('An error occurred during the file check process');
      }
    });
  } catch (error) {
    console.log('An error occurred during the file check process');
  }
});

job.start();
