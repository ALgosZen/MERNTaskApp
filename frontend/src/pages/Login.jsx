import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''   
  })

  const {email, password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }) )
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return <>
    <section className="heading">
      <h3>
        <FaSignInAlt /> Login
      </h3>
      <p>Please Login to set Goals</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
         <div className="form-group">
          <input type='text' 
          className='form-control' 
          id='email'
          name='email' 
          value={email} 
          placeholder='Enter Your Email'
          onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input type='text' 
          className='form-control' 
          id='password'
          name='password' 
          value={password} 
          placeholder='Enter Your password'
          onChange={onChange}
          />
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
  
  </>
}

export default Login