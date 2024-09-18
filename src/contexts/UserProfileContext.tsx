import { createContext, useContext, JSX } from "solid-js";
import { createStore } from "solid-js/store";

export interface UserProfile {
  interests: string[];
  learningGoal: string;
  learningStyle: string;
  learningTime: string;
  device: string;
}

const UserProfileContext = createContext<
  [UserProfile, (profile: Partial<UserProfile>) => void]
>([
  {
    interests: [],
    learningGoal: "",
    learningStyle: "",
    learningTime: "",
    device: "",
  },
  () => {},
]);

export function UserProfileProvider(props: { children: JSX.Element }) {
  const [profile, setProfile] = createStore<UserProfile>({
    interests: [],
    learningGoal: "",
    learningStyle: "",
    learningTime: "",
    device: "",
  });

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...newProfile }));
  };

  return (
    <UserProfileContext.Provider value={[profile, updateProfile]}>
      {props.children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => useContext(UserProfileContext);
