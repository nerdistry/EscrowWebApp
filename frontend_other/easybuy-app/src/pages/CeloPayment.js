import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import LayoutCeloP from '../components/LayoutCeloP'
import TimeLine from '../components/TimeLine'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { ABI, ADMIN_ADDRESS, CONTRACT_ADDRESS } from '../constants/abi_address' //getting the variables being exported from abi_address.js file
import '../CeloPayment.css';
import {
  deleteCartProduct,
  getUserCart,
  updateQuantity,
} from "../features/user/userSlice";
import { ethers } from 'ethers'; // Import the Celo-specific ethers library


function CeloPayment() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount');
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const { isWeb3Enabled, account, web3} = useMoralis() // Retrieving two variables from the Moralis Web3 API

  /*The below useState hooks are used to keep track of the 
  buyer’s address,
  contract balance, 
  seller’s address, 
  and whether the buyer and seller have confirmed the transaction or not.*/ 

  //   Buyer state
  const [buyer, setBuyer] = useState('')

  //   Contract balance
  const [balance, setBalance] = useState(null)

  //   Seller State
  const [seller, setSeller] = useState('')

  //   buyer confirmation status
  const [buyerConfirmed, setBuyerConfirmed] = useState(false)

  //   seller confirmed status
  const [sellerConfirmed, setSellerConfirmed] = useState(false)

  //  Admin address which is easybuy - the deployer of the contract
  const [adminAddress, setAdminAddress] = useState(
    '0x6Afb764baB05F71285690dfae11eb38d665e5845'
  )

  useEffect(() => {
    if (isWeb3Enabled) {
      populateData()
    }
  }, [
    isWeb3Enabled,
    account,
    buyerConfirmed,
    balance,
    buyerConfirmed,
    sellerConfirmed,
  ])
    useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backendURL}/api/data`);
      const data = await response.json();
      // Process the data...
    };

    fetchData();
  }, [backendURL]);

  // The populateData: If We may want to render all the fetched data on the initial page load of the UI.

  // Fetch the buyer and seller address
  const populateData = async () => {
    try {
      const returnedBuyer = await getBuyer()
      setBuyer(returnedBuyer)

      const returnedSeller = await getSeller()
      setSeller(returnedSeller)

      const buyerStatus = await getBuyerConfirmation()
      setBuyerConfirmed(buyerStatus)

      const sellerStatus = await getSellerConfirmation()
      setSellerConfirmed(sellerStatus)

      const balanceResult = await getBalance()
      setBalance(balanceResult.toString())
    } catch (error) {
      console.log(error.response)
    }
  }

  const { runContractFunction: getBuyer } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getBuyer',
    params: {},
  })

  //   Get balance - directly calls the contract function getBalance by passing in the contract address and ABI directly.
  const { runContractFunction: getBalance } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getBalance',
    params: {}, // Just in case the function needs any parameters
  })

  const { runContractFunction: getSeller } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getSeller',
    params: {},
  })

  //   Get buyer Confirmation status
  const { runContractFunction: getBuyerConfirmation } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getBuyerConfirmation',
    params: {},
  })

  //   Get seller Confirmation status
  const { runContractFunction: getSellerConfirmation } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'getSellerConfirmation',
    params: {},
  })

  //   CONTRACT MUTATION FUNCTIONS
  //   Deposit money
  const {
    isLoading,
    runContractFunction: deposit,
    isFetching,
    error,
  } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'deposit',
    params: {},
    msgValue: 1, // Specifies the amount of Celo being sent with the transaction.
  })

  //   Buyer Confirm delivery
  const {
    // isLoading,
    runContractFunction: confirmSellerDelivery,
    // isFetching,
    // error,
  } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'confirmSellerDelivery',
    params: {},
  })

  //   Seller Confirms receipt
  const {
    // isLoading,
    runContractFunction: confirmBuyerReceipt,
    // isFetching,
    // error,
  } = useWeb3Contract({
    abi: ABI,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'confirmBuyerReceipt',
    params: {},
  })

  const depositFunds = async (amount) => {
    try {
      const signer = web3.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.deposit({ value: ethers.utils.parseEther(parseInt(amount).toString()) });
      await tx.wait();
  
      // Update the UI with the new balance
      const updatedBalance = await contract.getBalance();
      setBalance(updatedBalance.toString());
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleDeposit = async () => {
    if (!isNaN(amount) && amount > 0) {
      await depositFunds(parseInt(amount));
      console.log(amount);
    }
  };

  const confirmDelivery = async () => {
    try {
      await confirmSellerDelivery()
    } catch (err) {
      console.log(error)
    }
  }

  const confirmReceipt = async () => {
    try {
      await confirmBuyerReceipt()
    } catch (err) {
      console.log(error)
    }
  }

  return (
    <LayoutCeloP>
      <button
        onClick={handleDeposit}
        className="btn"
      >
        Deposit Payment
      </button>

      {balance && <h1 className="bal">Escrow bal: {balance}</h1>}

      <h2>
        Admin:{' '}
        <span className="address">
          {`${adminAddress.substring(0, 4)}....${adminAddress.substring(
            adminAddress.length - 4
          )}`}
        </span>
      </h2>
      <h2>
        Buyer:
        {buyer && (
          <span className="address">
            {`${buyer.substring(0, 4)}....${buyer.substring(
              adminAddress.length - 4
            )}`}
          </span>
        )}
      </h2>
      <h2>
        Seller:
        {seller && (
          <span className="address">
            {`${seller.substring(0, 4)}....${seller.substring(
              adminAddress.length - 4
            )}`}
          </span>
        )}
      </h2>

      {/* Timeline */}
      <div className="flex items-center flex-1">
        {account &&
          buyer?.toLocaleLowerCase() === account?.toLocaleLowerCase() &&
          !buyerConfirmed && (
            <button
              onClick={confirmDelivery}
              className="confirm"
            >
              Confirm Delivery
            </button>
          )}
        {account &&
          seller?.toLocaleLowerCase() === account?.toLocaleLowerCase() &&
          !sellerConfirmed && (
            <button
              onClick={confirmReceipt}
              className="confirm"
            >
              Confirm Receipt
            </button>
          )}
      </div>

      <TimeLine
        buyerConfirmed={buyerConfirmed}
        sellerConfirmed={sellerConfirmed}
      />
    </LayoutCeloP>
  )
}

export default CeloPayment