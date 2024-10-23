const { MongoClient } = require('mongodb');

// MongoDB connection URL and database/collection name
const uri = 'mongodb://3AUserPROD:3ngag3m3ntAppPROD@35.198.216.56:27017/tip';  // Update this to your MongoDB URI
const dbName = 'tip';  // Replace with your database name
const collectionName = 'registrations';  // Replace with your collection name

async function removeDuplicates() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Find duplicates based on the combination of 'email' and 'eventId'
        const duplicates = await collection.aggregate([
            {
                $group: {
                    _id: { eventId: "$eventId", email: "$email" },  // Group by both 'eventId' and 'email'
                    count: { $sum: 1 },
                    docs: { $push: "$_id" }  // Collect all document IDs
                }
            },
            {
                $match: {
                    count: { $gt: 1 }  // Only keep groups with more than 1 document (i.e., duplicates)
                }
            }
        ]).toArray();

        console.log(`Found ${duplicates.length} groups of duplicates`);

        // Loop through the duplicates and remove all but one
        for (let duplicate of duplicates) {
            const idsToDelete = duplicate.docs.slice(1);  // Keep the first document, delete the rest

            // Delete the duplicates
            await collection.deleteMany({ _id: { $in: idsToDelete } });
            console.log(`Removed ${idsToDelete.length} duplicates for eventId: ${duplicate._id.eventId} 
                and email: ${duplicate._id.email}`);
        }

        console.log('Duplicate removal process completed.');
    } catch (error) {
        console.error('Error removing duplicates:', error);
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}

// Run the script
removeDuplicates();