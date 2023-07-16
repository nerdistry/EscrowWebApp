// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Escrow {
    uint256 public escrowBalance = 0;
    uint256 public escrowAvailable = 0;
    uint256 public totalConfirmed = 0;
    uint256 public totalDisputed = 0;
    uint256 public escrowFee = 1; // for example, 1%

    struct Item {
        string name;
        uint256 price;
        uint256 quantity;
        address payable seller;
        bool available;
    }

    struct Order {
        uint256 itemId;
        address payable buyer;
        bool delivered;
        bool buyerConfirmed;
    }

    Item[] public items;
    Order[] public orders;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public sellerBalances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

function buyItem(uint256 itemId, uint256 price, uint256 quantity) public payable {
    require(quantity > 0, "Item out of stock");
    require(balances[msg.sender] >= price, "Insufficient balance");
    require(price > 0, "Invalid price");
    require(!items[itemId].available, "Item not available");
    require(items[itemId].seller != msg.sender, "Seller cannot buy their own item");

    // Deduct the item price from the buyer's balance
    balances[msg.sender] -= price;

    // Update the escrow balance
    escrowBalance += price;

    // Update the item quantity and availability
    updateItemDetails(itemId);

    // Create the order
    createOrder(itemId, payable(msg.sender));
}


function updateItemDetails(uint256 itemId) private {
    Item storage item = items[itemId];
    item.quantity--;
    item.available = (item.quantity != 0);
}

function createOrder(uint256 itemId, address payable buyer) private {
    orders.push(Order(itemId, buyer, false, false));
}


    function deliverItem(uint256 orderId) public {
        Order storage order = orders[orderId];
        Item storage item = items[order.itemId];

        require(msg.sender == item.seller, "Only the seller can deliver");
        require(!order.delivered, "Item already delivered");

        order.delivered = true;
    }

    function confirmDelivery(uint256 orderId) public {
        Order storage order = orders[orderId];
        Item storage item = items[order.itemId];

        require(order.buyer == msg.sender, "Only the buyer can confirm delivery");
        require(order.delivered, "Delivery not yet confirmed");

        uint256 fee = (item.price * escrowFee) / 100;
        uint256 payment = item.price - fee;

        escrowBalance -= item.price;
        escrowAvailable += fee;

        order.buyerConfirmed = true;
        sellerBalances[item.seller] += payment;

        totalConfirmed++;
    }

    function refundOrder(uint256 orderId) public {
        Order storage order = orders[orderId];

        require(msg.sender == order.buyer, "Only the buyer can dispute the order");
        require(!order.delivered, "Item already delivered");

        escrowBalance -= items[order.itemId].price;
        balances[order.buyer] += items[order.itemId].price;

        totalDisputed++;
    }

    function withdraw() public {
        uint256 amount = sellerBalances[msg.sender];  
        require(amount > 0, "No funds to withdraw");  
        sellerBalances[msg.sender] = 0;  
        payable(msg.sender).transfer(amount);  
    }
}
