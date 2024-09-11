import { createSignal, createEffect, onCleanup } from "solid-js";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const BLOCK_DURATION = 30 * 60; // 30分（秒単位）
const BLOCKS_PER_DAY = 48;

const PomodoroTimer = () => {
  const [currentBlock, setCurrentBlock] = createSignal(0);
  const [timeElapsed, setTimeElapsed] = createSignal(0);
  const [serverTime, setServerTime] = createSignal<Timestamp | null>(null);

  const syncServerTime = async () => {
    const timestamp = await serverTimestamp();
    setServerTime(timestamp as Timestamp);
  };

  const getJSTDate = (date: Date) => {
    return new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC+9 for JST
  };

  createEffect(() => {
    syncServerTime();
    const interval = setInterval(() => {
      if (serverTime()) {
        const now = getJSTDate(new Date());
        const serverTimeJST = getJSTDate(serverTime()!.toDate());

        const totalSecondsToday =
          now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        const currentBlockNumber =
          Math.floor(totalSecondsToday / BLOCK_DURATION) + 1;
        const elapsedInCurrentBlock = totalSecondsToday % BLOCK_DURATION;

        setCurrentBlock(currentBlockNumber);
        setTimeElapsed(elapsedInCurrentBlock);

        // コンソールに時間情報を表示
        console.log(
          "Current time (JST):",
          now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
        );
        console.log(
          "Server time (JST):",
          serverTimeJST.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
        );
        console.log("Current block:", currentBlockNumber);
        console.log(
          "Time elapsed in current block:",
          formatTime(elapsedInCurrentBlock)
        );
      }
    }, 1000);

    onCleanup(() => clearInterval(interval));
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <h2>
        現在のブロック: {currentBlock()} / {BLOCKS_PER_DAY}
      </h2>
      <div>経過時間: {formatTime(timeElapsed())}</div>
    </div>
  );
};

export default PomodoroTimer;
