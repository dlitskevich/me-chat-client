import { useEffect, useState } from "react";

export const useVideo = (pc: RTCPeerConnection) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoStream, setVideoStream] = useState<MediaStream>(
    new MediaStream()
  );

  useEffect(() => {
    return () => {
      pc.getSenders().forEach((sender) => {
        alert(sender);
        pc.removeTrack(sender);
      });
    };
  }, [pc]);

  return {
    videoStream,
    isMuted,
    toggleVideo: () => {
      if (
        isMuted &&
        !videoStream.active &&
        (pc.getSenders().length ? pc.getSenders()[0].track === null : true)
      ) {
        connectVideo({ pc, videoStream, setVideoStream });
        setIsMuted(!isMuted);
      }
      if (!isMuted && videoStream.active) {
        disconnectVideo({ pc, videoStream, setVideoStream });
        setIsMuted(!isMuted);
      }
    },
  };
};

type Args = {
  pc: RTCPeerConnection;
  videoStream: MediaStream;
  setVideoStream: React.Dispatch<React.SetStateAction<MediaStream>>;
};

const connectVideo = ({ pc, videoStream, setVideoStream }: Args) => {
  navigator.mediaDevices.getUserMedia({ video: true }).then((v) => {
    // Push tracks from local stream to peer connection
    v.getVideoTracks().forEach((track) => {
      pc.addTrack(track, videoStream);
      console.log(pc, pc.getSenders());
    });
    setVideoStream(v.clone());
  });
};

const disconnectVideo = ({ pc, videoStream, setVideoStream }: Args) => {
  videoStream.getVideoTracks().forEach((track) => {
    track.stop();
  });
};
