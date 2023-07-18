import React from 'react'
import { ConnectButton } from 'web3uikit'

const LayoutCeloP = ({ children }) => {
  return (
    <div className="p-4">
      <ConnectButton moralisAuth={false} />
      <div className="flex flex-col flex-1 items-center justify-center h-screen">
        {children}
      </div>
    </div>
  )
}

export default LayoutCeloP
