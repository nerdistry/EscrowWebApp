// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

error Escrow__NotAdminRequestDenied();
error Escrow__OnyBuyerDepositAllowed();
error Escrow__OnlyBuyerDepositAllowed();
error Escrow__InsufficientAmountDeposited();
error Escrow__OnlyBuyerConfirmDeposit();
error Escrow__ContractAlreadyInProgress();
error Escrow__BothPartiesMustConfirmFirst();

contract Escrow {
    address private i_admin;
    address payable private s_buyer;
    address payable private s_seller;

    uint256 private s_balance;
    uint256 amount = 0;

    bool private buyerConfirmation; // Track whether the buyer has confirmed the transaction.
    bool private sellerConfirmation; // Track whether easybuy has confirmed the transaction.

    /* Events; to keep track of the changes. */
    event Deposit(address indexed buyerAddress, uint256 indexed amount); // when the buyer makes a depost.
    event DeliveryConfirmed(address indexed buyerAddress); // when the buyer confirms delivery.
    event ReceiptDone(address indexed sellerAddress); // when easybuy confirms the receipt.

  
    event PaymentReleased( 
        address indexed buyerAddress,
        address indexed sellerAddress,
        uint256 amount
    );   // When the payment is released.


    constructor(address payable _buyer, address payable _seller) {
        i_admin = payable(msg.sender); 
        s_buyer = _buyer;
        s_seller = _seller;
        s_balance = 0;
    }

    /* The confirmSellerDelivery below is called buy the buyer who confirms the delivery of the product.
     Verifies that only the buyer can call this function. */

function deposit() public payable {
  // Get the amount of Celo that was sent with the transaction
  amount = msg.value;

  // Verify that the buyer is only depositing
  if (msg.sender != s_buyer) {
    revert Escrow__OnlyBuyerDepositAllowed();
  }

  // Add funds to the escrow balance
  s_balance += amount;

  // Emit a deposit event
  emit Deposit(msg.sender, amount);
}

function confirmSellerDelivery() public payable {
  // Verify that only the buyer confirms the delivery
  if (msg.sender != s_buyer) {
    revert Escrow__OnlyBuyerConfirmDeposit();
  }

  buyerConfirmation = true;

  // Emit a delivery confirmation event
  emit DeliveryConfirmed(msg.sender);

  // Release payment if both parties have confirmed
  if (buyerConfirmation && sellerConfirmation) {
    s_seller.transfer(s_balance);
    buyerConfirmation = false;
    sellerConfirmation = false;
    s_balance = 0;
  }
}

    /* The confirmBuyerReceipt below is called by easybuy who confirms the receipt of the payment.
     Verifies that only the seller can call this function. */
    function confirmBuyerReceipt() public payable {
        // Verify that only the seller confirms the issuing the recipt
        if (msg.sender != s_seller) {
            revert Escrow__OnlyBuyerConfirmDeposit();
        }

        sellerConfirmation = true;

        // Emit a recepit done event
        emit ReceiptDone(msg.sender);

        // Call the release payment here...
        if (buyerConfirmation && sellerConfirmation) {
            s_seller.transfer(address(this).balance);
            sellerConfirmation = true;
            s_balance = 0;
        }
    }


    function addParties(address payable buyer, address payable seller) public {
        if (msg.sender != i_admin) {
            revert Escrow__NotAdminRequestDenied();
        }

        s_buyer = buyer;
        s_seller = seller;
    }

    function getBalance() public view returns (uint256) {
        return s_balance / 1e18;
    }

    function getAdmin() public view returns (address) {
        return i_admin;
    }

    function getBuyer() public view returns (address) {
        return s_buyer;
    }

    function getSeller() public view returns (address) {
        return s_seller;
    }

    function getBuyerConfirmation() public view returns (bool) {
        return buyerConfirmation;
    }

    function getSellerConfirmation() public view returns (bool) {
        return sellerConfirmation;
    }
}
