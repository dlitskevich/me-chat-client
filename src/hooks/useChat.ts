import { useEffect } from "react";
import { Socket } from "socket.io-client";

type Args = {
  socket: Socket;
  addMessage: (msg: string) => void;
};

export default function useChat({ socket, addMessage }: Args) {
  useEffect(() => {
    socket.on("message", addMessage);
  }, [socket, addMessage]);

  const emitMessage = (msg: string) => {
    socket.emit("message", msg);
  };

  return [emitMessage];
}
