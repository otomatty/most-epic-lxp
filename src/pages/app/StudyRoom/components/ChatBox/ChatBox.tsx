import { Component, createSignal, createEffect, For } from 'solid-js';
import { auth, firestore } from '../../../../../firebase/config';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  ChatContainer,
  MessageList,
  MessageItem,
  InputContainer,
} from './ChatBox.styles';

interface ChatBoxProps {
  roomId: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

const ChatBox: Component<ChatBoxProps> = (props) => {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [newMessage, setNewMessage] = createSignal('');

  createEffect(() => {
    const messagesRef = collection(
      firestore,
      'studyRooms',
      props.roomId,
      'messages'
    );
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Message)
      );
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  });

  const handleSendMessage = async (e: Event) => {
    e.preventDefault();
    if (!newMessage().trim() || !auth.currentUser) return;

    const messagesRef = collection(
      firestore,
      'studyRooms',
      props.roomId,
      'messages'
    );
    await addDoc(messagesRef, {
      text: newMessage(),
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <ChatContainer>
      <MessageList>
        <For each={messages()}>
          {(message) => (
            <MessageItem>
              <strong>{message.userId}: </strong>
              {message.text}
            </MessageItem>
          )}
        </For>
      </MessageList>
      <InputContainer onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage()}
          onInput={(e) => setNewMessage(e.currentTarget.value)}
          placeholder="メッセージを入力..."
        />
        <button type="submit">送信</button>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatBox;
