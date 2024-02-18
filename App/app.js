// app.js

document.addEventListener('DOMContentLoaded', async () => {
    let isConnected = false;

    // Function to handle MetaMask connection
    const connectToMetaMask = async () => {
        if (window.ethereum) {
            try {
                await ethereum.enable();
                alert("You're Connected!");
                isConnected = true;
                if (isConnected ==true) {
                    disconnectFromMetaMask();
                }
                
            } catch (error) {
                console.error('Error connecting to MetaMask:', error.message);
                alert('Error connecting to MetaMask. Check the console for details.');
            }
        } else {
            alert('MetaMask not detected. Please install MetaMask to use this feature.');
        }

        // Update button text based on connection status
        updateConnectButtonText();
    };

    // Connect to MetaMask when the button is clicked
    document.getElementById('connectButton').addEventListener('click', () => {
        if (isConnected) {
            disconnectFromMetaMask();
        } else {
            connectToMetaMask();
        }
    });

    // Function to disconnect from MetaMask
    const disconnectFromMetaMask = async () => {
        if (window.isMetaMaskConnected()) {
            try {
                await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
                console.log('Disconnected from MetaMask.');
                isConnected = false;
            } catch (error) {
                console.error('Error disconnecting from MetaMask:', error.message);
            }
        }

        // Update button text based on connection status
        updateConnectButtonText();
    };

    // Function to update the connect button text based on connection status
    const updateConnectButtonText = () => {
        const connectButton = document.getElementById('connectButton');
        if (isConnected) {
            connectButton.innerText = 'Connected';
            connectButton.disabled = true; // Optionally, disable the button after connecting
        } else {
            connectButton.innerText = 'Connect to MetaMask';
            connectButton.disabled = false; // Enable the button
        }
    };

    // Initial update of button text when the page loads
    updateConnectButtonText();

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
