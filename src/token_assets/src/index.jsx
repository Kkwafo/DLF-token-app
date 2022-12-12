import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {


  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {
    handreAuthenticated(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handreAuthenticated(authClient);
      }

    });

  }
}



async function handreAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  const userPricipal = identity._principal.toString();
  console.log(userPricipal);
  ReactDOM.render(<App loggedInPrincipal={userPrincipal} />, document.getElementById("root"));
}

init();


