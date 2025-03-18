import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const updateEntry = async (id, newDone) => {
  try {
    const response = await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId1,
      id,
      { Done: newDone }
    );
  } catch (error) {
    console.error(error);
  }
};

export default updateEntry;
