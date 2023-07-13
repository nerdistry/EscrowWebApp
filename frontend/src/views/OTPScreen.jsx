<Form onSubmit={getOtp} className="auth_form">
<FormGroup>
  <PhoneInput
    placeholder="Enter the number you registered with"
    country={"ke"} // default selected country, can be changed according to your preference
    value={number}
    onChange={(phone) => setNumber(phone)}
  />
  <div id='recaptcha-container'/>
</FormGroup>
<div className=''>
  <Link to='/login'>
    <Button variant='secondary'>Cancel</Button> &nbsp;
  </Link>
  <Button variant='primary' type='submit'>Send OTP</Button>
</div>
</Form>