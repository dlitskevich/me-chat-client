import React, { useState } from "react";
import { db } from "../hooks/useFirestore";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

type Props = {
  pc: RTCPeerConnection;
};

export const RTCmanager = ({ pc }: Props) => {
  const [callId, setCallId] = useState("");
  return (
    <div className="container">
      <div className="row rtc-manager">
        <button
          type="button"
          className="col btn btn-primary"
          onClick={() => createOffer(pc, setCallId)}
        >
          Create offer
        </button>
        <input
          className="col-3 mx-2"
          value={callId}
          onChange={(e) => setCallId(e.target.value)}
          placeholder="Call Id goes here"
        ></input>
        <button
          type="button"
          className="col btn btn-primary"
          onClick={() => acceptOffer(pc, callId)}
        >
          Answer offer
        </button>
      </div>
    </div>
  );
};

const createOffer = async (
  pc: RTCPeerConnection,
  setCallId: React.Dispatch<React.SetStateAction<string>>
) => {
  // Reference Firestore collections for signaling
  const callDoc = await addDoc(collection(db, "calls"), {});
  const offerCandidates = collection(callDoc, "offerCandidates");
  const answerCandidates = collection(callDoc, "answerCandidates");
  setCallId(callDoc.id);

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    console.log("createOffer onicecandidate", event);
    event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
  };

  // Create offer
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await setDoc(callDoc, { offer });

  // Listen for remote answer
  onSnapshot(callDoc, (snapshot) => {
    console.log("Got updated room:", snapshot.data());
    const data = snapshot.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // Listen for remote ICE candidates
  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      console.log(change);

      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
};

const acceptOffer = async (pc: RTCPeerConnection, callId: string) => {
  const callDoc = doc(collection(db, "calls"), callId);
  const offerCandidates = collection(callDoc, "offerCandidates");
  const answerCandidates = collection(callDoc, "answerCandidates");

  pc.onicecandidate = (event) => {
    event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
  };

  // Fetch data, then set the offer & answer
  const callData = (await getDoc(callDoc)).data();

  const offerDescription = callData?.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await updateDoc(callDoc, { answer });

  // Listen to offer candidates

  onSnapshot(offerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        let data = change.doc.data();
        pc.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
};
