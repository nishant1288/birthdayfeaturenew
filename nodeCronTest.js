import cron from 'node-cron';

cron.schedule('1 * * * *', () => {
    console.log('running a task every minute');
});