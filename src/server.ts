import { app, httpServer, io } from './app';
import { importCSV } from './utils/csvImporter';

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    // Uncomment to import CSV data when server starts
    // try {
    //   await importCSV('./data/financial_data.csv');
    //   console.log('CSV data imported successfully');
    // } catch (error) {
    //   console.error('Error importing CSV data:', error);
    // }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});