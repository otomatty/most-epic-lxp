import { Component, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { auth, firestore, storage } from "../../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { FirestoreCollections } from "../../../types/users";
import {
  EditProfileContainer,
  EditProfileForm,
  EditProfileInput,
  EditProfileButton,
  EditProfileFileInput,
  CurrentAvatar,
} from "./EditProfile.styled";

const EditProfile: Component = () => {
  const [userData, setUserData] =
    createSignal<FirestoreCollections.User | null>(null);
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [photoURL, setPhotoURL] = createSignal("");
  const [photoFile, setPhotoFile] = createSignal<File | null>(null);
  const [isGoogleUser, setIsGoogleUser] = createSignal(false);
  const navigate = useNavigate();

  createEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as FirestoreCollections.User;
          setUserData(data);
          setUsername(data.username);
          setEmail(data.email);
          setPhotoURL(data.photoURL || "default-avatar.jpg");
          setIsGoogleUser(!!data.googleUserInfo);
        }
      }
    };

    fetchUserData();
  });

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setPhotoFile(target.files[0]);
    }
  };

  const handleUpdateProfile = async (e: Event) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        let newPhotoURL = photoURL();

        if (photoFile()) {
          // 画像を圧縮
          const compressedFile = await imageCompression(photoFile()!, {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
          });

          // Firebase Storageにアップロード
          const storageRef = ref(storage, `avatars/${user.uid}`);
          await uploadBytes(storageRef, compressedFile);
          newPhotoURL = await getDownloadURL(storageRef);
        }

        // Firebase Authenticationのユーザー情報を更新
        await updateProfile(user, {
          displayName: username(),
          photoURL: newPhotoURL,
        });

        if (!isGoogleUser()) {
          await updateEmail(user, email());
        }

        // Firestoreのユーザー情報を更新
        await updateDoc(doc(firestore, "users", user.uid), {
          username: username(),
          email: email(),
          photoURL: newPhotoURL,
          updatedAt: new Date(),
        });

        alert("プロフィールが更新されました。");
        navigate("/profile");
      } catch (error) {
        console.error("プロフィールの更新に失敗しました:", error);
        alert("プロフィールの更新に失敗しました。");
      }
    }
  };

  return (
    <EditProfileContainer>
      <h1>プロフィール編集</h1>
      {userData() ? (
        <EditProfileForm onSubmit={handleUpdateProfile}>
          <CurrentAvatar src={photoURL()} alt="Current Avatar" />
          <EditProfileFileInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <EditProfileInput
            type="text"
            placeholder="ユーザー名"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            required
          />
          {!isGoogleUser() && (
            <EditProfileInput
              type="email"
              placeholder="メールアドレス"
              value={email()}
              onInput={(e) => setEmail(e.currentTarget.value)}
              required
            />
          )}
          <EditProfileButton type="submit">更新</EditProfileButton>
        </EditProfileForm>
      ) : (
        <p>ユーザー情報を読み込んでいます...</p>
      )}
    </EditProfileContainer>
  );
};

export default EditProfile;
