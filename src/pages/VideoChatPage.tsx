import React from "react";
import { Video } from "../components/Video";
import { useAudio } from "../hooks/useAudio";
import { useRemoteStream } from "../hooks/useRemoteStream";
import { useVideo } from "../hooks/useVideo";
import { RTCmanager } from "../components/RTCmanager";
import { useRTC } from "../hooks/useRTC";

export const VideoChatPage = () => {
  const { peerConnection } = useRTC();
  const localVideo = useVideo(peerConnection);
  const localAudio = useAudio(peerConnection);
  const [remoteStream] = useRemoteStream(peerConnection);
  return (
    <div className="container">
      <RTCmanager pc={peerConnection} />

      <div className="row controls justify-content-center my-5">
        <button
          type="button"
          className={`col-3 mx-2 btn btn-${
            localVideo.isMuted ? "primary" : "danger"
          }`}
          onClick={localVideo.toggleVideo}
        >
          {localVideo.isMuted ? "Video is off" : "Video is on"}
        </button>
        <button
          type="button"
          className={`col-3 mx-2 btn btn-${
            localAudio.isMuted ? "primary" : "danger"
          }`}
          onClick={localAudio.toggleAudio}
        >
          {localAudio.isMuted ? "Mic is off" : "Mic is on"}
        </button>
      </div>
      <div className="row">
        <div className="col m-4">
          <Video
            srcObject={localVideo.videoStream}
            autoPlay
            playsInline
            width="360px"
            height="360px"
          />
          {/* <Audio srcObject={localAudio.audioStream} autoPlay playsInline /> */}
        </div>
        <div className="col m-4">
          <Video
            srcObject={remoteStream}
            autoPlay
            playsInline
            width="360px"
            height="360px"
          />
        </div>
      </div>
    </div>
  );
};
