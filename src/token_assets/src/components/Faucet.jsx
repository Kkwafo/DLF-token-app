import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const [idDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Get it Now!");


  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const atuthnticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await atuthnticatedCanister.payOut();
    setText(result);
    // setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        DLF Token App
      </h2>
      <label>Get your free DLF tokens here! Claim 1,000 DLF token to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disable={idDisabled}
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
