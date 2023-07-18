
import React from 'react'
import { ConnectButton } from 'web3uikit'

const LayoutCeloP = ({ children }) => {
  return (
    <div className="celo-wrap">
      <ConnectButton moralisAuth={false} />
      <div className="layout-celo">
        {children}
      </div>
    </div>
  )
}

export default LayoutCeloP