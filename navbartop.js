document.write(`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="index.html">Dikke dApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="mint.html">Mint</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="dex.html">DEX</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="nfts.html">My NFTs</a>
          </li>
                        </ul>
            <button id="logout_button" class="btn btn-outline-primary my-2 my-sm-0" type="submit">Log out</button>
          <button id="login_button" class="btn btn-outline-primary my-2 my-sm-0" type="submit">Sign in with Metamask</button>
    </div>
  </nav>
`)