import { useEffect, useState } from "react";

export const useRemoteStream = (pc: RTCPeerConnection) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream>(
    new MediaStream()
  );

  useEffect(() => {
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      console.log("useRemoteStream", event);
      const copyStream = new MediaStream();
      event.streams[0].getTracks().forEach((track) => {
        copyStream.addTrack(track);
      });
      setRemoteStream(copyStream);
    };

    // return () => {
    //   remoteStream.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // };
  }, [pc, remoteStream]);

  return [remoteStream];
};
