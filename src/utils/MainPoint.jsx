import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const PointSave = async (userId, point) => {
  try {
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId2,
      ID.unique(),
      { userId: userId, Point: point }
    );
    console.log("Text stored: ", response);
  } catch (error) {
    console.error(error);
  }
};
export default PointSave;
