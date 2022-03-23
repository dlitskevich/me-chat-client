import React, {useState} from "react";

type Props = {
  emitMessage: (message:string) => void;
};

export default function Input({ emitMessage }: Props) {
  const [text, setText] = useState("")
  return (
    <form className="chat-input" onSubmit={(e)=>{
      e.preventDefault()
      if(text){
        emitMessage(text)
      }
      setText("")
      }}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="submit" value="Send" />
    </form>
  );
}
