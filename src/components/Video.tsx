import React, { useEffect, useRef, VideoHTMLAttributes } from "react";

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
};

export const Video = ({ srcObject, width, height, ...props }: Props) => {
  const videoElement = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.srcObject = srcObject;
    }
  }, [srcObject]);
  if (!srcObject.active) {
    return (
      <div
        className="container justify-content-center align-items-center"
        style={{
          width: width,
          height: height,
          background: "gray",
        }}
      >
        <p>Video is disabled</p>
      </div>
    );
  }
  return (
    <div className="d-flex">
      <video
        ref={videoElement}
        width={width}
        height={height}
        {...props}
      ></video>
    </div>
  );
};
