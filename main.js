/** Connect to Moralis server: Learn on Mainnet */ 
const serverUrl = "https://cchlbet7lnxn.usemoralis.com:2053/server";
const appId = "rfnNsI3bNs3wnKsGEYPeZodvcEOUP84OFMJmevPs";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();

/** Add from here down */
async function login() {
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
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

function initApp(){
    document.querySelector("#app").style.display = "block";
    document.querySelector("#submit_button").onclick = submit;
}

async function submit(){
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
        chain: 'rinkeby',
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        royaltiesAmount: 1000, // 0.05% royalty. Optional  Mf: 1000 = 10%?
    })
    console.log(res);
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}">View NFT`;
    document.querySelector('#success_message').style.display = "block";
    setTimeout(() => {
        document.querySelector('#success_message').style.display = "none";
    }, 5000)
}

login()
