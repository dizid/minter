/* Moralis Login logic */

/* TEST ONLY */
/* Connect to Moralis server */
/* Login */ 
/* Logout */
/* Button actions */
/* Blockchain connection  */
/* Switch blockchain network  */
/* Metamask */

/* TEST ONLY */


/* Connect to Moralis server */
const serverUrl = "https://cchlbet7lnxn.usemoralis.com:2053/server"
const appId = "rfnNsI3bNs3wnKsGEYPeZodvcEOUP84OFMJmevPs"
Moralis.start({ serverUrl, appId })

/* Login */ 
async function login() {
let currentUser = Moralis.User.current()
if(!currentUser){
    currentUser = await Moralis.Web3.authenticate({signingMessage: "Welcome to Dikke dApp" })
    document.querySelector('#login_button').innerText = currentUser.get('ethAddress');  // Show eth address in login button
    console.log("Moralis user: ", currentUser)
      console.log("currentUser.get.('ethAddress'): ",currentUser.get('ethAddress'))
}
}
/** Logout */
async function logOut() {
  await Moralis.User.logOut()
  document.querySelector('#login_button').innerText = "Sign in with Metamask"
  console.log("logged out")
}
/* Button actions */
document.getElementById("login_button").onclick = login
document.getElementById("logout_button").onclick = logOut
if(Moralis.User.current()) {
    let currentUser = Moralis.User.current()
document.querySelector('#login_button').innerText = currentUser.get('ethAddress') // Show eth address in login button
console.log("currentUser.get.('ethAddress'): ",currentUser.get('ethAddress'))}
else login()

/* Blockchain connection */
var web3
checkWeb3()

function displayMessage(messageType, message){
    messages = {
        "00":`<div class= "alert alert-success"> ${message} </div>`,
        "01":`<div class= "alert alert-danger"> ${message} </div>`
    }
    document.getElementById("resultSpace").innerHTML = messages[messageType]
}

async function getNetwork(){
    chainID = await web3.eth.net.getId()
    displayMessage("00","Your active network is "+ getNetworkName(chainID))
}

function getNetworkName(chainID){
    networks = {
        1:"Ethereum Mainnet",3:"Ropsten testnetwerk",4:"Ethereum Rinkeby",5: "Goerli Test Network",
        42:"Kovan-testnetwerk",56:"Binance Smart Chain",97:"BSC testnet",137:"Polygon Matic Mainnet",250:"Fantom Opera"
    }
    return networks[chainID]
}
/* Monitor network */
function monitorNetwork(){
    Moralis.onChainChanged(function(){
        window.location.reload()
    })
}

/* Switch network (fired from onclick button id="switchNetwork" in mint.html*/
async function switchNetwork (a) {
    if (a == 'rinkeby') {var MychainId = '0x4'
     localStorage.setItem("Blockchain", a)}
    if (a == 'eth') {var MychainId = '0x1'
    localStorage.setItem("Blockchain", a)} 
  console.log("localstorage Blockchain: ",localStorage.getItem("Blockchain")) 
    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: MychainId }],
      });
    } catch (error) {  // TODO: add more providers here, with full info, not only chainid as above
      if (error.code === 4902) {
        try {
          await web3.currentProvider.request({   
            method: "wallet_addEthereumChain",
            params: [{
              chainId:  "0x4",
              chainName: "Rinkeby",
              rpcUrls: ["https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
              nativeCurrency: {
                name: "Rinkeby",
                symbol: "ETH",
                decimals: 18,
              },
              blockExplorerUrls: ["https://rinkey.etherscan.io"],
            },
            ],
          });
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }

function setWeb3Environment(){
    web3 = new Web3(window.ethereum)
    getNetwork()
    monitorNetwork()
}

/* Metamask */
async function checkWeb3(){
    const ethereum = window.ethereum
    if(!ethereum || !ethereum.on) {
        displayMessage("01", "This DApp requires the MetaMask wallet,<a href=\"https://metamask.io/\"> Install MetaMask</a>")
    }
    else{
        setWeb3Environment()
    }
}
