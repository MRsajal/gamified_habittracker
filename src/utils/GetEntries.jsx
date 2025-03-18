import { databases } from "../appwriteConfig";
import { Query } from "appwrite";

const collectionId1 = "67d10f93002cdccb53e5";
const databasesId = "67cad1ac000134fb60a5";

const getEntries = async (userId) => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId1,
      [Query.equal("userId", userId)]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getEntries;
