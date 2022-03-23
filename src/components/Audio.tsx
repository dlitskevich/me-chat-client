import React, { AudioHTMLAttributes, useEffect, useRef } from "react";

type Props = AudioHTMLAttributes<HTMLAudioElement> & {
  srcObject: MediaStream;
};

export const Audio = ({ srcObject, ...props }: Props) => {
  const videoElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (videoElement.current) {
      videoElement.current.srcObject = srcObject;
    }
  }, [srcObject]);
  if (!srcObject.active) {
    return null;
  }
  return <audio ref={videoElement} {...props}></audio>;
};
