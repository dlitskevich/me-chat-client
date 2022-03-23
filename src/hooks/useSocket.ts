// import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

export default function useSocket() {
  const socket = socketIOClient(ENDPOINT);
  //console.log(socket);
  // useEffect(() => {
  //   // const socket = socketIOClient(ENDPOINT);
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  return [socket];
}
