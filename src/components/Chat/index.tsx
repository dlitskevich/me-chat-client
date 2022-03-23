import React, { useState } from "react";
import { Socket } from "socket.io-client";
import useChat from "../../hooks/useChat";
import Input from "./Input";
import Message from "./Message";

type Props = {
  socket: Socket;
};

export default function Chat({ socket }: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const addMessage = (msg: string) => {
    setMessages([...messages, msg]);
  };
  const [emitMessage] = useChat({ socket, addMessage });
  return (
    <>
      {messages.map((msg) => (
        <Message key={msg} text={msg} />
      ))}
      <Input emitMessage={emitMessage} />
    </>
  );
}
