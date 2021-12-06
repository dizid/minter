/* Show & Share NFTs */
// get NFTs for current user on Mainnet
async function getNFTs() {
    const options = { chain: 'eth', address: '0x9aD20636BD158831B7cEBb3dbf0754648E8F6Bb1' };
    const nfts = await Moralis.Web3.getNFTs(options);
 console.log("User NFTs: ", nfts)

nfts.forEach(function(nft) {
    let url = fixURL(nft.token_uri)

    fetch(url, {mode: 'no-cors' })
    .then(response => response.json())
    .then(data => {
        $("#content").html($("#content").html()+"<h2>"+data.name+"</h2>")
        $("#content").html($("#content").html()+"<h3>"+data.description+"</h3>")
        $("#content").html($("#content").html()+"<img width=100 height=100 src='"+fixURL(data.image)+"'/>")
    })
})
}  
getNFTs()

function fixURL(url) {
    console.log("fixURL URLS: ", url)
    if(url.startsWith("ipfs") && typeof lastname !== "undefined"){
        return "https://ipfs.moralis.io:2053/ipfs/"+url.split("ipfs://ipfs")
    }
    else {
        return url+"?format=json"
}
}


// example:  https://storage.googleapis.com/deeznutsnft/final/Nut2485.json?format=json  // WORKS