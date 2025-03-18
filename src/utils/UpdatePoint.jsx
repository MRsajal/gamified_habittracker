import { databases } from "../appwriteConfig";
import { Query } from "appwrite";

const updatePoint = async (id, newPoint) => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId2,
      [Query.equal("userId", id)]
    );
    if (response.documents.length > 0) {
      const documentId = response.documents[0].$id;
      const updateDoc = await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_databasesId,
        import.meta.env.VITE_APPWRITE_collectionId2,
        documentId,
        { Point: newPoint }
      );
      console.log("Points update successfully:", updateDoc);
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error updating points: ", error);
  }
};

export default updatePoint;
