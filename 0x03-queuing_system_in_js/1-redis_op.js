import { createClient } from 'redis';

async function main() {
    // Create and connect the Redis client
    const client = createClient();

    // Event listener to handle connection
    client.on('connect', () => {
        console.log('Redis client connected to the server');
    });

    // Event listener to handle errors
    client.on('error', (err) => {
        console.error('Error occurred:', err);
    });

    // Ensure that the Redis client is properly initialized
    await client.connect();

    try {
        // Set a new school value
        await client.set('School', '100');
        console.log('Set School value to 100');
        
        // Get the value of 'School'
        const value = await client.get('School');
        console.log('Got value for School:', value);

        // Additional logic if needed (such as a delay or more commands)
        await new Promise(resolve => setTimeout(resolve, 5000));  // 5 seconds delay

        console.log('Finished operations, closing client...');
        
    } catch (error) {
        console.error('Error while interacting with Redis:', error);
    } finally {
        // Quit the Redis client connection after the operations are complete
        await client.quit();
        console.log('Redis client connection closed.');
    }
}

// Execute the main function
main().catch((err) => {
    console.error('Unexpected error:', err);
});
