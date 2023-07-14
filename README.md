<h1 align="center">
  <br>
  <a href="http://localhost"><img src="./frontend/public/logo192.png" alt="EasyBuy" width="200"></a>
  <br>
  EasyBuy
  <br>
</h1>

<h4 align="center">An ecommerce application on the <a href="https://www.euromoney.com/learning/blockchain-explained/what-is-blockchain" target="_blank">Blockchain</a>.</h4>

<p align="center">
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
         alt="MongoDB">
  </a>    
  <a href="https://soliditylang.org/">
      <img src="https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity">
  </a>
  
  <a href="https://nodejs.org/en">
      <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS">
  </a>

</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

<!-- ![screenshot](https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif) -->

## Introduction
Ecommerce platforms have always been very beneficial in terms of wider access to goods. 
Despite its many advantages there exist challenges that plague online transactions which include 
data security, lack of trust and payment disputes. To confront these challenges, this study 
presents an application that leverages principles of blockchain technology and escrow services to 
create a secure, trustworthy ecommerce marketplace. Addressing the inherent challenges 
ultimately enhances user confidence and mitigates potential risks. The methodology involves 
designing an intuitive application that integrates escrow services, securely holding the buyer's 
payment until both parties reach an agreement. Smart contracts powered by blockchain which 
define the conditions for releasing the funds from escrow to the seller upon successful delivery 
and buyer approval; will also be developed. The anticipated findings of this research suggest that 
the combination of escrow services and blockchain technology will enhance the credibility of 
online marketplaces. Users will have the assurance that their funds are safeguarded until the 
product’s condition is verified and the transaction deemed satisfactory. By addressing the 
challenge of trust, this application aims to revolutionize ecommerce platforms, enabling the 
market to engage in transactions with confidence. Ultimately, this solution aims to foster a 
thriving ecommerce ecosystem that benefits both buyers and sellers alike, leading to increased 
user satisfaction and improved transactional experiences.



## Key Features

- Connect to MetaMask Wallet.
- Instant read of Ethereum Balance.
- Transact securely using Ethereum.
- Windows and Linux ready.
    - Not tested on other platforms.


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/nerdistry/EscrowWebApp.git 

# Delete the node modules and package-lock files in both the front and back end folders.

# Go into the front end folder
$ cd frontend

# Install dependencies for the front end.
$ npm install

#Go back a directory
$ cd ..

# Go into the back end folder
$ cd backend

# Install dependencies for the backend end.
$ npm install

#Install hardhat
$ npx hardhat

#Go back a directory
$ cd ..

# Go into the front end folder
$ cd frontend

# Run the app
$ npm start

```

> **Note**
> Remember for Windows you have to have XAMPP installed. And the database we are using is MongoDB.
> ⚠️⚠️ We're using testnets for this web application and for security reasons, it is highly recommended you follow suit. 
>
<!-- > If you're stuck breathe in-out then check the above gif. -->


## Credits

This web app uses the following important packages for the:

**(a) Normal Backend**
- [Cloudinary](https://cloudinary.com/)
- [Ethers](https://www.npmjs.com/package/ethers)
- [Express](https://www.npmjs.com/package/express)
- [Formik](https://formik.org/docs/overview)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Slugify](https://www.npmjs.com/package/slugify)

There were just worth mentioning, you can check out the rest in the package-lock.json file in the backend folder.

**(a) Solidity Backend**
- [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started)
- [Ethereum-Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)
- [Chai](https://ethereum-waffle.readthedocs.io/en/latest/)


**(b) Frontend**
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Testing Library](https://www.npmjs.com/package/@testing-library/react)
- [Template](https://adminlte.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Firebase](https://firebase.google.com/)
- [React](https://reactnative.dev/)

The packages are more than we can mention!

#### Output Structure
---

```shell
Escrow_Web_App/
├── backend/
│   ├── config/
│   │   └── dbConnect.js
│   │   └── jwtToken.js
│   │   └── refreshtoken.js
│   ├── contracts/
│   │   └── escrow.sol
│   ├── controller/
│   │   └── brandCtrl.js
│   │   └── categoryCtrl.js
│   │   └── emailCtrl.js
│   │   └── productCtrl.js
│   │   └── userCtrl.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │   └── errprHandler.js
│   │   └── uploadImages.js
│   ├── models/
│   │   └── brandModel.js
│   │   └── cartModel.js
│   │   └── categoryModel.js
│   │   └── orderModel.js
│   │   └── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   └── authRoute.js
│   │   └── brandRoute.js
│   │   └── categoryRoute.js
│   │   └── productRoute.js
│   ├── scripts/
│   │   └── deploy.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
└── README.md

```

## License

MIT

---

> GitHub [@bryanlwaya](https://github.com/BryanLwaya) &nbsp;&middot;&nbsp;
> GitHub [@fanisheba](https://github.com/nerdistry) &nbsp;&middot;&nbsp;
