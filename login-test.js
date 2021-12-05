// Moralis Login logic

/** Connect to Moralis server */
const serverUrl = "https://cchlbet7lnxn.usemoralis.com:2053/server";
const appId = "rfnNsI3bNs3wnKsGEYPeZodvcEOUP84OFMJmevPs";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Welcome to Dikke dApp" })
      document.querySelector('#login_button').innerText = user.get('ethAddress'); 
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

// async function logOut() {
//   await Moralis.User.logOut();
//   console.log("logged out");
// }

document.getElementById("login_button").onclick = login;
// document.getElementById("logout-button").onclick = logOut;
