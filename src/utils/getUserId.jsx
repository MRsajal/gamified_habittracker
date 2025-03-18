import { account } from "../appwriteConfig";
async function getUserId() {
  try {
    const user = await account.get();
    console.log("User ID:", user.$id);
    return user.$id;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // User is not logged in
  }
}
export default getUserId;
