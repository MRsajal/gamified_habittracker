import { Query } from "appwrite";
import { databases } from "../appwriteConfig";

const getPoint = async (userId) => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId2,
      [Query.equal("userId", userId)]
    );
    if (response.documents.length > 0) {
      return response.documents[0].Point; // Return user's points
    } else {
      console.log("User points not found.");
      return 0; // Default value if not found
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
};
export default getPoint;
