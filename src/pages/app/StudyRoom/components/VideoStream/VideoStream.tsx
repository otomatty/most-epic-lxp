import { Component } from "solid-js";

interface VideoStreamProps {
  localStream: MediaStream | null;
}

const VideoStream: Component<VideoStreamProps> = (props) => {
  return (
    <div>
      {props.localStream && (
        <video
          autoplay
          muted
          ref={(el) => {
            if (el) el.srcObject = props.localStream;
          }}
        />
      )}
    </div>
  );
};

export default VideoStream;
