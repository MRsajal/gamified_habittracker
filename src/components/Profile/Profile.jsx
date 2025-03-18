import React, { useEffect, useState } from "react";
import getPoint from "../../utils/GetPoint";
import "./Profile.css";
import { account, databases, storage } from "../../appwriteConfig";
import { useAuth } from "../../utils/AuthContext";

import { ID, Query } from "appwrite";

export default function Profile() {
  const [mainPoint, setMainPoint] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      async function fetchMainPoint() {
        try {
          const point = await getPoint(user.$id);
          setMainPoint(point || 0);
        } catch (error) {
          console.error("Error fetching points: ", error);
          setMainPoint(0);
        }
      }
      fetchMainPoint();
    }
  }, [user]);
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFileId, setImageFileId] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        console.error("User not logged in");
      }
    }
    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      async function fetchProfileImage() {
        try {
          const fileId = await getProfileImageFileId(userId);
          if (!fileId) {
            console.error("No profile image found.");
            return;
          }
          console.log("File ID:", fileId);

          const imageUrl = storage.getFilePreview(
            import.meta.env.VITE_APPWRITE_bucketId,
            fileId
          );
          console.log("Generated Image URL:", imageUrl);

          setProfileImage(imageUrl);
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
      fetchProfileImage();
    }
  }, [userId]);
  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (imageFileId) {
        await storage.deleteFile(
          import.meta.env.VITE_APPWRITE_bucketId,
          imageFileId
        );
      }
      const response = await storage.createFile(
        import.meta.env.VITE_APPWRITE_bucketId,
        ID.unique(),
        file
      );
      const newFileId = response.$id;
      await saveProfileImageFileId(userId, newFileId);

      const filePreview = storage.getFilePreview(
        import.meta.env.VITE_APPWRITE_bucketId,
        newFileId
      );
      const freshImageUrl = `${filePreview.href}?t=${new Date().getTime()}`;
      setImageFileId(newFileId);

      setProfileImage(freshImageUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }
  async function handleRemoveImage() {
    try {
      if (imageFileId) {
        await storage.deleteFile(
          import.meta.env.VITE_APPWRITE_bucketId,
          imageFileId
        );
        await saveProfileImageFileId(userId, "");
      }
      setProfileImage(null);
      setImageFileId(null);
    } catch (error) {
      console.error("Error removing image:", error);
    }
  }
  return (
    <div className="profile">
      <div className="profile-image">
        {!profileImage ? (
          <input type="file" accept="image/" onChange={handleImageUpload} />
        ) : (
          <>
            <img
              key={profileImage}
              src={profileImage}
              alt="profile"
              onClick={() => document.querySelector("input[type=file]").click()}
            />
            <button onClick={handleRemoveImage}>Change</button>
          </>
        )}
      </div>
      <div className="about">
        <h1>{user.name}</h1>
        <LevelBar mainPoint={mainPoint} />
      </div>
    </div>
  );
}

async function getProfileImageFileId(userId) {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId3,
      [Query.equal("userId", userId)]
    );
    if (response.documents.length > 0) {
      return response.documents[0].profileImageId;
    }
    return null;
  } catch (error) {
    console.error("Error fetching profile image file ID: ", error);
    return null;
  }
}

async function saveProfileImageFileId(userId, fileId) {
  try {
    const existingDocuments = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_databasesId,
      import.meta.env.VITE_APPWRITE_collectionId3,
      [Query.equal("userId", userId)]
    );
    if (existingDocuments.documents.length > 0) {
      const documentId = existingDocuments.documents[0].$id;
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_databasesId,
        import.meta.env.VITE_APPWRITE_collectionId3,
        documentId,
        {
          profileImageId: fileId,
        }
      );
    } else {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_databasesId,
        import.meta.env.VITE_APPWRITE_collectionId3,
        ID.unique(),
        {
          userId,
          profileImageId: fileId,
        }
      );
    }
  } catch (error) {
    console.error("Error saving profile image file id:", error);
  }
}

function LevelBar({ mainPoint }) {
  const level = Math.floor(mainPoint / 50) + 1;
  const progress = Math.max((mainPoint % 50) * 2, 0);
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundColor: progress === 0 ? "red" : "blue",
    color: "white",
    textAlign: "center",
    padding: "5px",
    transition: "width 0.3s ease-in-out",
    display: "flex",
  };
  return (
    <>
      <h2>Level: {level}</h2>
      <div className="container1">
        <div style={progressBarStyle} className="skills progress">
          {progress}%
        </div>
      </div>
    </>
  );
}
