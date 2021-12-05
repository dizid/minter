/* Moralis Login logic */

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

document.getElementById("login_button").onclick = login;
document.getElementById("logout_button").onclick = logOut;
async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}



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
        displayMessage("01", "This DApp requires the MetaMask wallet, <a href=\"https://metamask.io/\">Install MetaMask</a>");
    }
    else{
        //displayMessage("00", "Metamask is Installed");
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
        1:"Ethereum Mainnet",
        3:"Ropsten testnetwerk",
        4:"Ethereum Rinkeby",
        5: "Goerli Test Network",
        42:"Kovan-testnetwerk",
        56:"Binance Smart Chain",
        97:"BSC testnet",
        137:"Polygon Matic Mainnet",
        250:"Fantom Opera",
        80001:"Polygon Mumbai Testnet"
    }
    return networks[chainID];
}

function monitorNetwork(){
    Moralis.onChainChanged(function(){
        window.location.reload()
    })
}


/* Function for including HTML on every page: topnavbar, footer, etc */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

