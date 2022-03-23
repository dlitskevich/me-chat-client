import { useEffect, useState } from "react";

export const useAudio = (pc: RTCPeerConnection) => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioStream, setAudioStream] = useState<MediaStream>(
    new MediaStream()
  );

  useEffect(() => {
    return () =>
      pc.getSenders().forEach((sender) => {
        pc.removeTrack(sender);
      });
  }, [pc]);

  return {
    audioStream,
    isMuted,
    toggleAudio: () => {
      if (isMuted && !audioStream.active) {
        connectAudio({ pc, audioStream, setAudioStream });
        setIsMuted(!isMuted);
      }
      if (!isMuted && audioStream.active) {
        disconnectAudio({ pc, audioStream, setAudioStream });
        setIsMuted(!isMuted);
      }
    },
  };
};

type Args = {
  pc: RTCPeerConnection;
  audioStream: MediaStream;
  setAudioStream: React.Dispatch<React.SetStateAction<MediaStream>>;
};

const connectAudio = ({ pc, audioStream, setAudioStream }: Args) => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((v) => {
    // Push tracks from local stream to peer connection
    v.getAudioTracks().forEach((track) => {
      pc.addTrack(track, audioStream);
    });
    setAudioStream(v.clone());
  });
};

const disconnectAudio = ({ pc, audioStream, setAudioStream }: Args) => {
  audioStream.getAudioTracks().forEach((track) => {
    track.stop();
  });
};
