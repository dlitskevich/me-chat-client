import React from "react";

type Props = {
  text: string;
};

export default function Message({ text }: Props) {
  return (
    <p className="message">
      {text}
    </p>
  );
}
