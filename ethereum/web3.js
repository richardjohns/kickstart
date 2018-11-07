import Web3 from 'web3';

// assuming that an instance of web3 (ie viewer has metamask) is already injected into the page.
// const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we're in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    // we're on the server OR viewer is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/e03afb307804401ab0173c2b24cdfc88'
    )
    web3 = new Web3(provider);
}

export default web3;