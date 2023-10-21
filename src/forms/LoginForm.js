import React, { useState, useRef, useEffect } from 'react';
import db from '../store/dexie'
import '../styles/login.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useCompany, useCompanyUpdate, useCurrentUser, useCurrentUserUpdate } from '../contexts/CompanyContext'

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const inputRef = useRef(null);
  const currentUser = useCompany()
  const changeUser = useCurrentUserUpdate()
  const companyId = useCompany()
  const changeCompanyId = useCompanyUpdate()

  useEffect(() => {
    // Set focus when the component mounts
    inputRef.current.focus();
  }, [])

  const hashPassword = (password) => {
    // Implement your password hashing logic here
    // Use a secure hashing algorithm (e.g., bcrypt)
    // For this example, we're using a simple hash function (not secure for production)
    return password; // Replace with actual hashing
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    const goLogin = async () => {
      try {
        // Ensure that username is defined and not empty
        if (!username) {
          return;
        }
        // Fetch user data from Dexie
        const user = await db.users.where('username').equals(username).first();
        if (user && verifyPassword(password, user.hashedPassword)) {
          let obj = { 'user_id': user.id, 'companies': user.companies, 'last_company': user.last_company }
          props.openCompany(obj)
          changeUser(user.id)
          changeCompanyId(user.last_company)
          console.log("testedtR user changed to : ", user.id)
          // currentCompany(user.id)
          props.response("valid")
        } else {
          props.response("invalid")
          window.alert('ERROR user or password not on system')
          // props.response("invalid")
        }
      } catch (error) {
        console.error('ERROR Error fetching user:', error);
      }
    };
    if (props.proceedLogin) goLogin();
  }, [props.proceedLogin]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fetch user data from Dexie
    const user = await db.users.get(username);
  };

  const verifyPassword = (password, hashedPassword) => {
    // Implement your password verification logic here
    // Compare the hashed password with the hash of the entered password
    // You'll need to use a suitable hashing algorithm and verify the password with the salt

    // For the sake of example, we're using a simple comparison
    return password === hashedPassword;
  };

  const handleCloseModal = () => {
    // setShowModal(false)
  }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1.25rem"
        }}
        onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "7rem 15rem",
            marginBottom: "0.5rem"
          }}>
          <label
            style={{ textAlign: "right" }}
            htmlFor="username">Username:</label>
          <input
            ref={inputRef}
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        {/* <div
          style={{
            display: "grid",
            gridTemplateColumns: "7rem 15rem"
          }}> */}

        {/* <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          /> */}
        {/* </div> */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "7rem 15rem 3rem"
          }}>
          <label
            style={{ textAlign: "right" }}
            htmlFor="password">Password:</label>
          <input
            id="password"
            value={password}
            onChange={handlePasswordChange}
            type={passwordShown ? "text" : "password"}
          />
          <button
            type="button"
            onClick={togglePassword}
            style={{
              // width: "1.5rem",
              border: "none",
              backgroundColor: "transparent",
              margin: "0"
            }}
          >
            {passwordShown ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
          </button>
        </div>

      </form>
      {/* {showReg &&
            <RegistrationForm />}
        </Modals>} */}

    </div>
  );
}

export default LoginForm;
