import { databases } from "../appwriteConfig";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_databasesId;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_collectionId1;
async function resetDailyHabits() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    for (const doc of response.documents) {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        Done: false,
      });
    }
  } catch (error) {
    console.error();
  }
}

export default resetDailyHabits;
