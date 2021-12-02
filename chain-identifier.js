// CHECK and report CHAIN

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
        displayMessage("01", "This App Requires MetaMask, <a href=\"https://metamask.io/\">Install MetaMask</a>");
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
        56:"Binance Smart Chain Mainnet",
        97:"Binance Smart Chain TESTnet",
        137:"Matic Mainnet",
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