/* Create NFT */
async function createNFT(){
    document.getElementById('spinner').style.display = 'inline'  // MF show spinner

    const input = document.querySelector('#input_image')
    let data = input.files[0]
    const imageFile = new Moralis.File(data.name, data)
    await imageFile.saveIPFS()
    let imageHash = imageFile.hash()

    let metadata = {
        name: document.querySelector('#input_name').value,
        description: document.querySelector('#input_description').value,
        image: "/ipfs/" + imageHash
    }
    console.log(metadata)
    const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))})
    await jsonFile.saveIPFS()

    let metadataHash = jsonFile.hash()
    console.log(jsonFile.ipfs())
    let res = await Moralis.Plugins.rarible.lazyMint({
        chain:  localStorage.getItem("Blockchain"),
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        royaltiesAmount: 500, // 5% royalty
    })
    console.log(res)

    // $('#spinner').hide()  // MF hide spinner
    document.getElementById('spinner').style.display = 'none'

    if (localStorage.getItem("Blockchain") == 'rinkeby') {
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}" target="blanc">View your NFT`;}
    if (localStorage.getItem("Blockchain") == 'eth') {
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}" target="blanc">View your NFT`;}

    document.querySelector('#success_message').style.display = "block"
    setTimeout(() => {
        document.querySelector('#success_message').style.display = "none"
    }, 30000)
}
