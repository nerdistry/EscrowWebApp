import React from 'react'

const ProtectedVendorRoute = () => {

    // One cannot access the vendor dashboard unless they have already applied and have been approved
    // If a user has not applied to be a vendor, they will be redirected to a page to be apply
    
    // If they applied and have been approved, they can access it

    // check if user exists then check if the user role is vendor(meaning they have been approved)
    // *** Find a way to send email notification on approval and show a user if they have not yet been approved ***
  return (
    <div>ProtectedVendorRoute</div>
  )
}

export default ProtectedVendorRoute