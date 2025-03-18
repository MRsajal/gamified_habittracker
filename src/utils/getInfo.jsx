import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const collectionId = "67d2832d003669a23835";
const databasesId = "67cad1ac000134fb60a5";

const getInfo = async (userId) => {
  try {
    const response = await databases.listDocuments(databasesId, collectionId, [
      Query.equal("userId", userId),
    ]);
    if (response.documents.length > 0) {
      return response.documents[0].About; // Return user's points
    } else {
      console.log("User points not found.");
      return 0; // Default value if not found
    }
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getInfo;
