import { createContext, createSignal, JSX } from "solid-js";

type StudyRoomContextType = {
  isInStudyRoom: () => boolean;
  setIsInStudyRoom: (value: boolean) => void;
};

export const StudyRoomContext = createContext<StudyRoomContextType>({
  isInStudyRoom: () => false,
  setIsInStudyRoom: () => {},
});

export const StudyRoomProvider = (props: { children: JSX.Element }) => {
  const [isInStudyRoom, setIsInStudyRoom] = createSignal(false);

  return (
    <StudyRoomContext.Provider value={{ isInStudyRoom, setIsInStudyRoom }}>
      {props.children}
    </StudyRoomContext.Provider>
  );
};
