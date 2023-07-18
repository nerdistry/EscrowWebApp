const {
    time,
    loadFixture,
  } = require('@nomicfoundation/hardhat-network-helpers')
  const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
  const { expect, assert } = require('chai')
  const { ethers } = require('hardhat')
  
  describe('Escrow', function () {
    let owner, escrowContract, escrowAddress, rawEscrowContract
    // Set up
    beforeEach(async function () {
      // get the deployer
      const [deployer, otherAccount] = await ethers.getSigners()
  
      const Escrow = await ethers.getContractFactory('Escrow', deployer)
      const escrow = await Escrow.deploy({})
  
      owner = deployer
      escrowContract = escrow
      escrowAddress = escrow.address
    })
  
    describe('Constructor', function () {
      it('Should set the admin address', async function () {
        const adminAddress = await escrowContract.getAdmin()
  
        expect(adminAddress.toString()).to.equal(owner.address)
      })
    })
  
    describe('AddParties', function () {
      it('Should add both parties to the contract', async function () {
        const [deployer, buyer, seller] = await ethers.getSigners()
  
        await escrowContract.addParties(buyer.address, seller.address)
  
        const buyerAddress = await escrowContract.getBuyer()
        const sellerAddress = await escrowContract.getSeller()
  
        expect(buyerAddress.toString()).to.equal(buyer.address)
        expect(sellerAddress.toString()).to.equal(seller.address)
      })
    })
  
    describe('Deposit', function () {
      let localSigner, localContract
  
      beforeEach(async function () {
        const signers = await ethers.getSigners()
        localSigner = signers[1]
  
        // connect local signer to local contract
        localContract = await escrowContract.connect(localSigner)
      })
  
      it('Should fail when not a buyer tries to deposit', async function () {
        const [deployer, buyer, seller] = await ethers.getSigners()
  
        amount = ethers.utils.parseEther('0.5')
  
        await localContract.connect(buyer).deposit({
          value: amount,
        })
      })
  
      // it('Should fail when not a buyer tries to deposit little money', async function () {
      //   const [deployer, buyer, seller] = await ethers.getSigners()
  
      //   amount = ethers.utils.parseEther('0')
  
      //   await expect(
      //     escrowContract.connect(buyer).deposit({
      //       value: amount,
      //     })
      //   ).to.be.revertedWithCustomError
      //   // assert(tx)
      // })
  
      // it('Should successfully deposit the money', async function () {
      //   const [deployer, buyer, seller] = await ethers.getSigners()
  
      //   amount = ethers.utils.parseEther('5')
  
      //   const tx = await escrowContract.connect(buyer).deposit({
      //     value: amount,
      //   })
      // })
    })
  })
  