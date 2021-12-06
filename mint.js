/** Add from here down */
async function login() {
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "You are connected with your wallet!" })
      initApp();
   } catch(error) {
     console.log(error)
   }
  }
  else{
    Moralis.enableWeb3();
    initApp();
  }
}
// TEST click button to change network. PS: 
// change to rinkeby // TEST mumbai

async function switchNetwork (a) {
  if (a == 'rinkeby') {var MychainId = '0x4'
   localStorage.setItem("Blockchain", a)}
  if (a == 'eth') {var MychainId = '0x1'
  localStorage.setItem("Blockchain", a)}
console.log("Blockchain" , localStorage.getItem("Blockchain"))
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: MychainId }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.currentProvider.request({   
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x4",
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
        alert(error.message);
      }
    }
  }
}


function initApp(){
    document.querySelector("#app").style.display = "block";
    document.querySelector("#submit_button").onclick = submit;
    switchNetwork ('eth')
}

async function submit(){

    //('#spinner').show()  // MF show spinner
    document.getElementById('spinner').style.display = 'inline';

    const input = document.querySelector('#input_image');
    let data = input.files[0]
    const imageFile = new Moralis.File(data.name, data)
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();

    let metadata = {
        name: document.querySelector('#input_name').value,
        description: document.querySelector('#input_description').value,
        image: "/ipfs/" + imageHash
    }
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await jsonFile.saveIPFS();

    let metadataHash = jsonFile.hash();
    console.log(jsonFile.ipfs())
    let res = await Moralis.Plugins.rarible.lazyMint({
        chain:  localStorage.getItem("Blockchain"),
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        royaltiesAmount: 500, // 5% royalty
    })
    console.log(res);

    // $('#spinner').hide()  // MF hide spinner
    document.getElementById('spinner').style.display = 'none';

    if (localStorage.getItem("Blockchain") == 'rinkeby') {
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}" target="blanc">View your NFT`;}
    if (localStorage.getItem("Blockchain") == 'eth') {
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}" target="blanc">View your NFT`;}

    document.querySelector('#success_message').style.display = "block";
    setTimeout(() => {
        document.querySelector('#success_message').style.display = "none";
    }, 30000)
}

login()
