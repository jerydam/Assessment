// app.js

document.addEventListener('DOMContentLoaded', async () => {
    // Connect to the Ethereum network using MetaMask or any other provider
    if (window.ethereum) {
        try {
            await ethereum.enable();
            window.web3 = new Web3(ethereum);
        } catch (error) {
            console.error('User denied account access:', error);
            alert('You need to connect to MetaMask to use this calculator.');
            return;
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        alert('You need to connect to MetaMask to use this calculator.');
        return;
    }

    // Contract ABI (Application Binary Interface)
    const abi = [
        {"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"add","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},
        {"inputs":[{"internalType":"uint256","name":"a","type":"uint256"},{"internalType":"uint256","name":"b","type":"uint256"}],"name":"multiply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},
        {"inputs":[{"internalType":"int256","name":"a","type":"int256"},{"internalType":"int256","name":"b","type":"int256"}],"name":"subtract","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"}
    ]; 
    // Contract address
    const contractAddress = '0x7e10bb15778f5558bf4dbd1701acefd56443e1a4'; 

    // Create contract instance
    const calculatorContract = new web3.eth.Contract(abi, contractAddress);

    // Function to check if connected to MetaMask
    window.isMetaMaskConnected = () => {
        return window.ethereum && window.ethereum.selectedAddress;
    };

    // Function to toggle MetaMask connection
    window.toggleMetaMaskConnection = async () => {
        if (window.isMetaMaskConnected()) {
            // Disconnect if already connected
            await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
            alert('Disconnected from MetaMask.');
        } else {
            // Connect if not connected
            try {
                await ethereum.enable();
                alert('Connected to MetaMask!');
            } catch (error) {
                console.error('Error connecting to MetaMask:', error.message);
                alert('Error connecting to MetaMask. Check the console for details.');
            }
        }

        // Update button text based on connection status
        updateConnectButtonText();
    };

    // Function to update the connect button text based on connection status
    const updateConnectButtonText = () => {
        const connectButton = document.getElementById('connectButton');
        if (window.isMetaMaskConnected()) {
            connectButton.innerText = 'Connected';
            connectButton.disabled = true; // Optionally, disable the button after connecting
        } else {
            connectButton.innerText = 'Toggle MetaMask Connection';
            connectButton.disabled = false; // Enable the button
        }
    };

    // Initial update of button text when the page loads
    updateConnectButtonText();

    const disconnectFromMetaMask = async () => {
        if (window.isMetaMaskConnected()) {
            try {
                await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
                console.log('Disconnected from MetaMask.');
            } catch (error) {
                console.error('Error disconnecting from MetaMask:', error.message);
            }
        }
    };
    
    // Function to calculate addition
    window.calculateAddition = async () => {
        // Check if connected to MetaMask
        if (!window.isMetaMaskConnected()) {
            alert('Please connect to MetaMask before performing any operations.');
            return;
        }

        const number1 = document.getElementById('number1').value;
        const number2 = document.getElementById('number2').value;
        const result = await calculatorContract.methods.add(number1, number2).call();
        document.getElementById('result').innerText = result;
    };

    // Function to calculate subtraction
    window.calculateSubtraction = async () => {
        // Check if connected to MetaMask
        if (!window.isMetaMaskConnected()) {
            alert('Please connect to MetaMask before performing any operations.');
            return;
        }

        const number1 = document.getElementById('number1').value;
        const number2 = document.getElementById('number2').value;
        const result = await calculatorContract.methods.subtract(number1, number2).call();
        document.getElementById('result').innerText = result;
    };

    // Function to calculate multiplication
    window.calculateMultiplication = async () => {
        // Check if connected to MetaMask
        if (!window.isMetaMaskConnected()) {
            alert('Please connect to MetaMask before performing any operations.');
            return;
        }

        const number1 = document.getElementById('number1').value;
        const number2 = document.getElementById('number2').value;
        const result = await calculatorContract.methods.multiply(number1, number2).call();
        document.getElementById('result').innerText = result;
    };
});
