import { useContext, useState, useEffect, createContext } from "react";
import { account, databases } from "../appwriteConfig";
import { ID } from "appwrite";
import "./loader.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const accountDetails = await account.get();
        setUser(accountDetails);
      } catch (error) {
        console.log("No user session found");
        setUser(null);
      }
      setLoading(false);
    };
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      const response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      setUser(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const logoutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };
  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      const userId = ID.unique();
      let response = await account.create(
        userId,
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      );

      setUser(response);
      console.log("New User: ", response.$id);
      await databases.createDocument(
        "67cad1ac000134fb60a5",
        "67d1c51900334a8b4157",
        ID.unique(),
        { userId: response.$id, Point: 0 }
      );
      await databases.createDocument(
        "67cad1ac000134fb60a5",
        "67d2832d003669a23835",
        ID.unique(),
        { Name: userInfo.name, About: "Click to add text" }
      );
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="loading">
          {" "}
          <div class="loader"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthContext;

/* HTML: <div class="loader"></div> */
// .loader {
//   width: 50px;
//   --b: 8px;
//   aspect-ratio: 1;
//   border-radius: 50%;
//   background: #514b82;
//   -webkit-mask:
//     repeating-conic-gradient(#0000 0deg,#000 1deg 70deg,#0000 71deg 90deg),
//     radial-gradient(farthest-side,#0000 calc(100% - var(--b) - 1px),#000 calc(100% - var(--b)));
//   -webkit-mask-composite: destination-in;
//           mask-composite: intersect;
//   animation: l5 1s infinite;
// }
// @keyframes l5 {to{transform: rotate(.5turn)}}
