import React from 'react'

const TimeLine = ({ buyerConfirmed, sellerConfirmed }) => {
  return (
    <div className="timeline-wrapper">
      {/* Deposit */}
      <div className="timeline">
        <div
          className={`timeline-circle ${
            buyerConfirmed ? 'green' : 'neutral'
          }`}
        />

        <h3 className="timeline-text">
          {' '}
          Buyer confirms delivery
        </h3>

        <div
          className={`timeline-line ${
            buyerConfirmed ? 'green' : 'neutral'
          } `}
        />
      </div>

      {/* Delivery */}
      <div className="timeline">
        <div
          className={`timeline-circle ${
            sellerConfirmed ? 'green' : 'neutral'
          }`}
        ></div>
        <h3 className="timeline-text">
          EasyBuy confirms delivery of the product.
        </h3>
        <div
          className={`timeline-line ${
            sellerConfirmed ? 'green' : 'neutral'
          } `}
        />
      </div>

      {/* Payout */}
      <div
        className={`timeline-circle  ${
          sellerConfirmed ? 'green' : 'neutral'
        } `}
      ></div>
    </div>
  )
}

export default TimeLine