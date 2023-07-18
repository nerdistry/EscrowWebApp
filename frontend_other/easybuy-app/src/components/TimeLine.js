import React from 'react'

const TimeLine = ({ buyerConfirmed, sellerConfirmed }) => {
  return (
    <div className="flex px-14 flex-1  w-full items-center justify-between">
      {/* Deposit */}
      <div className="flex flex-1 w-full items-center relative">
        <div
          className={`w-8 h-8 ${
            buyerConfirmed ? 'bg-green-500' : 'bg-neutral-300'
          } rounded-full`}
        />

        <h3 className="absolute bottom-5 left-10 text-sm">
          {' '}
          Buyer confirms delivery
        </h3>

        <div
          className={`w-full mx-1 h-1 ${
            buyerConfirmed ? 'bg-green-500' : 'bg-neutral-300'
          } `}
        />
      </div>

      {/* Delivery */}
      <div className="flex flex-1 w-full items-center relative">
        <div
          className={`w-8 h-8 ${
            sellerConfirmed ? 'bg-green-500' : 'bg-neutral-300'
          } rounded-full`}
        ></div>
        <h3 className="absolute bottom-5 left-10 text-sm">
          Seller confirms receipt
        </h3>
        <div
          className={`w-full mx-1 h-1 ${
            sellerConfirmed ? 'bg-green-500' : 'bg-neutral-300'
          } `}
        />
      </div>

      {/* Payout */}
      <div
        className={`w-8 h-8 rounded-full  ${
          sellerConfirmed ? 'bg-green-500' : 'bg-neutral-300'
        } `}
      ></div>
    </div>
  )
}

export default TimeLine
