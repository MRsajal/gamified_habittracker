const sdk = require("node-appwrite");

module.exports = async function (context) {
  const client = new sdk.Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject(process.env.APPWRITE_ProjectId) // Replace with your Project ID
    .setKey(process.env.APPWRITE_API_KEY); // Replace with your API key

  const database = new sdk.Databases(client);

  try {
    const response = await database.listDocuments(
      process.env.APPWRITE_databasesId,
      process.env.APPWRITE_collectionId1
    );
    for (const doc of response.documents) {
      await database.deleteDocument(
        process.env.APPWRITE_databasesId,
        process.env.APPWRITE_collectionId1,
        doc.$id
      );
    }
    context.log("All documents deleted successfully!");
  } catch (error) {
    context.error("Error deleting documents:", error);
  }
};
