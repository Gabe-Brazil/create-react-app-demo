function SignupForm(){
    return(
        <>
        <div class="login-form-bd">
        <div class="form-wrapper">
          <div class="form-container">
            <h1> Please Signup</h1>
            <form>
              <div class="form-control">
                <input type="text" required></input>
                <label> Username</label>
              </div>

              <div class="form-control">
                <input type="text" required></input>
                <label> Email</label>
              </div>
      
              <div class="form-control">
                <input type="password" required></input>
                <label> Register Account</label>
              </div>
              <button class="login-btn">Login</button>
              <p class="text">Don't have an account? <a href="register.html"> Register</a></p>
            </form>
          </div>
        </div>
      </div>

      </>
    
    )
    }
    
    export default SignupForm;