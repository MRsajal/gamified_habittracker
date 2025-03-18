import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const deleteEntry = async (id) => {
  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId1,
      id
    );
  } catch (error) {
    console.error(error);
  }
};

export default deleteEntry;
