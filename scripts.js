/* Moralis Login logic */

/** Connect to Moralis server */
const serverUrl = "https://cchlbet7lnxn.usemoralis.com:2053/server";
const appId = "rfnNsI3bNs3wnKsGEYPeZodvcEOUP84OFMJmevPs";
Moralis.start({ serverUrl, appId });

/** Login */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Welcome to Dikke dApp" })
      document.querySelector('#login_button').innerText = user.get('ethAddress');  // Show eth address in login button
     localStorage.setItem("Metamask_address", user.get('ethAddress')) // Put Metamask address in localstorage
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}


//Check IF Metamask address is in localstorage and show in Login button
const MMaddress = localStorage.getItem("Metamask_address")
let user = Moralis.User.current();
if (MMaddress && user) {
  document.querySelector('#login_button').innerText = localStorage.getItem("Metamask_address")
  console.log("MM adres", MMaddress )
  }
  else  {
    login()
  }

/** Logout */
async function logOut() {
  await Moralis.User.logOut();
  document.querySelector('#login_button').innerText = "Sign in with Metamask"
  console.log("logged out");
}

document.getElementById("login_button").onclick = login;
// document.getElementById("logout_button").onclick = logOut;

/* CHECK and report on which CHAIN we are connected to */
var web3;
checkWeb3();

function displayMessage(messageType, message){
    messages = {
        "00":`<div class= "alert alert-success"> ${message} </div>`,
        "01":`<div class= "alert alert-danger"> ${message} </div>`
    }
    document.getElementById("resultSpace").innerHTML = messages[messageType];
}

async function checkWeb3(){
    const ethereum = window.ethereum;
    if(!ethereum || !ethereum.on) {
        displayMessage("01", "This DApp requires the MetaMask wallet,<a href=\"https://metamask.io/\"> Install MetaMask</a>");
    }
    else{
        setWeb3Environment()
    }
}

function setWeb3Environment(){
    web3 = new Web3(window.ethereum);
    getNetwork();
    monitorNetwork();
}

async function getNetwork(){
    chainID = await web3.eth.net.getId();
    displayMessage("00","Your active network is "+ getNetworkName(chainID));
}

function getNetworkName(chainID){
    networks = {
        1:"Ethereum Mainnet",3:"Ropsten testnetwerk",4:"Ethereum Rinkeby",5: "Goerli Test Network",
        42:"Kovan-testnetwerk",56:"Binance Smart Chain",97:"BSC testnet",137:"Polygon Matic Mainnet",250:"Fantom Opera"
    }
    return networks[chainID];
}

function monitorNetwork(){
    Moralis.onChainChanged(function(){
        window.location.reload()
    })
}


