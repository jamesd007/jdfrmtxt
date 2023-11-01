import React, { useState, useEffect } from 'react';
// import db from '../store/dexie'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
// Another component or file in your application
import { createUserDatabase, addUserToUserDatabase, switchToUserDatabase } from '../store/dexie';

// Usage example


function RegistrationForm(props) {
    console.log("tedtest props=",props)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const hashPassword = (password) => {
        // Implement your password hashing logic here
        // Use a secure hashing algorithm (e.g., bcrypt)
        // For this example, we're using a simple hash function (not secure for production)
        return password; // Replace with actual hashing
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        const updateRegDetails = async () => {
            if (!username || !password || !email) {
                alert('Please fill in all fields');
                return;
            }
            // Hash the user's password (you should use a secure hashing library)
            // const hashedPassword = hashPassword(password);

            // Save the user's details to the Dexie database
            const userId = 'uniqueUserId';//tedtest change this - also just want one temporary user database?
// Create a user database
const userDB = createUserDatabase(userId);

// Add a user to the database
try {
await addUserToUserDatabase(userId, {   
    username: username,
    email: email,
    hashedPassword: password,
    companies: "",
    last_company: ""});
    alert('Registration successful');
                props.success("success")
} catch (error) {
    console.error('ERROR registering user:', error);
    props.success("error" + error)
    alert('Registration failed');
}


// Switch to the user's database
const activeUserDB = switchToUserDatabase(userId);

            // try {
            //     await db.users.add({
            //         username: username,
            //         email: email,
            //         hashedPassword: password,
            //         companies: "",
            //         last_company: ""
            //     });
            //     alert('Registration successful');
            //     props.success("success")
            // } catch (error) {
            //     console.error('ERROR registering user:', error);
            //     props.success("error" + error)
            //     alert('Registration failed');
            // }
        }
        if (props.updateDatabase) updateRegDetails();
    }, [props.updateDatabase]);

    // const handleRegistration = async (event) => {
    //     event.preventDefault();
    // Validate user input (e.g., check for empty fields)
    // if (!username || !password || !email) {
    //     alert('Please fill in all fields');
    //     return;
    // }

    // // Hash the user's password (you should use a secure hashing library)
    // const hashedPassword = hashPassword(password);

    // // Save the user's details to the Dexie database
    // try {
    //     await db.users.add({ username, hashedPassword });
    //     alert('Registration successful');
    //     props.success("success")
    // } catch (error) {
    //     console.error('ERROR registering user:', error);
    //     alert('Registration failed');
    //     props.success("error")
    // }
    // };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1.25rem"
                }}
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "7rem 15rem",
                        marginBottom: "0.5rem"
                    }}>
                    <label
                        style={{ textAlign: "right" }}
                        htmlFor="email">email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
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
                    }}>
                    <label
                        style={{ textAlign: "right" }}
                        htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div> */}
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
            </div>
        </div>
    );
}

export default RegistrationForm;
