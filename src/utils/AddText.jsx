import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const createNote = async (text, number, done, flag, userId) => {
  try {
    console.log(import.meta.env.VITE_APPWRITE_databasesId);
    const response = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId1,
      ID.unique(),
      { Positive: text, Point: number, Done: done, Type: flag, userId: userId }
    );
    console.log("Text stored: ", response);
  } catch (error) {
    console.error(error);
  }
};
export default createNote;
