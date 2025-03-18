import { databases } from "../appwriteConfig";
import { ID } from "appwrite";

const collectionId = "67d10f93002cdccb53e5";
const databasesId = "67cad1ac000134fb60a5";

const updateInfo = async (id, newAbout) => {
  try {
    const response = await databases.updateDocument(
      databasesId,
      collectionId,
      id,
      { About: newDone }
    );
  } catch (error) {
    console.error(error);
  }
};

export default updateInfo;
