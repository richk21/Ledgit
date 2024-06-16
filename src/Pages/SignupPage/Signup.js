import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Box, InputAdornment, IconButton } from "@mui/material";
import { EmailOutlined as EmailIcon, LockOutlined as LockIcon, Close as CloseIcon,  Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonOutline as Person} from "@mui/icons-material";
import './Signup.css'
import BlogContract from '../../SmartContracts/build/contracts/Blog.json'
import getWeb3 from '../../utils/getWeb3.js';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setConfPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
    const [web3, setWeb3] = useState(null);
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        name:'',
        email:'',
        password:'',
        confpassword:'',
    })
    
    const handleClearName = () => setName("");
    const handleClearEmail = () => setEmail("");
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfPassword = () => setShowConfPassword(!showConfPassword);

    const validate = () =>{
        let tempErrors = {name:'', email:'', password:'', confpassword: ''};
        let isValid = true;

        if(!name){
            tempErrors.name="Name is required";
            isValid = false;
        }

        if(!email){
            tempErrors.email="Email is required";
            isValid = false;
        }else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "This email is not valid";
            isValid = false;
        }

        if(!password){
            tempErrors.password="Password is required";
            isValid = false;
        }else if (password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            tempErrors.password = "Password must contain at least one special character";
            isValid = false;
        } else if (!/\d/.test(password)) {
            tempErrors.password = "Password must contain at least one number";
            isValid = false;
        }

        if(!confPass){
            tempErrors.confpassword="Password Confirmation is required";
            isValid = false;
        }else if (confPass !== password) {
            tempErrors.confPass = "Passwords do not match";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid
    }

    useEffect(() => {
        const testGetWeb3 = async () => {
          try {
            console.log("getWeb3 initiated");
            setWeb3(await getWeb3());
            console.log("Web3 instance obtained", web3);
          } catch (error) {
            console.error("Error getting Web3", error);
          }
        };
        testGetWeb3();
      }, []);

    const handleSignup = async(e) => {
        e.preventDefault();
        console.log("handleSignup called");
        if(validate()){
            console.log("Validation passed");
            try {
                console.log("Web3 instance obtained");
                const accounts = await web3.eth.getAccounts();
                console.log("Accounts: ", accounts);
                const networkId = await web3.eth.net.getId();
                console.log("Network ID: ", networkId);
                const deployedNetwork = BlogContract.networks[networkId];
                console.log("Deployed network: ", deployedNetwork);
                const instance = new web3.eth.Contract(
                    BlogContract.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                console.log("Contract instance created");
                
                await instance.methods.signup(name, email, password).send({ from: accounts[0] });
                console.log("Signup transaction sent");
                console.log("Signup Successful!");
                navigate("/login");
            } catch (error) {
                console.error("Signup failed: ", error);
                alert("Signup Failed!");
            }
        }
    }

    /* const handleSignup = async(e) => {
        e.preventDefault()
        try {
            console.log("Testing getWeb3");
            const web3 = await getWeb3();
            console.log("Web3 instance obtained", web3);
        } catch (error) {
            console.error("Error getting Web3", error);
        }
    } */

    return (
        <Container className="signup-container" maxWidth="sm">
            <Box component="form" className="signup-form" noValidate autoComplete="off" onSubmit={handleSignup}>
            <div className="title-container">
                <div className="title"> Sign up!</div>
                <div className="subtitle">Register with Us Today and Start Sharing Your Ideas with the World!</div>
            </div>
            <TextField /* name */
                    fullWidth
                    variant="outlined"
                    label="Name"
                    placeholder="Enter Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    required={true}
                    InputProps={{
                        startAdornment: <Person position="start" style={{marginRight:'10px', color:'var(--neutral---main750)'}}/>,
                        endAdornment: name && (
                            <InputAdornment  position="end">
                                <IconButton onClick={handleClearName}>
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    margin="normal"
                    InputLabelProps={{
                        sx: {
                            '&.Mui-focused': {
                                color: 'var(--success---main900)', // label color when focused
                            },
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey', // default border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--success---main500)', // border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--success---main900)', // border color when focused
                            },
                        },
                    }}
                />
                <TextField /* email */
                    fullWidth
                    variant="outlined"
                    label="Email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    required={true}
                    InputProps={{
                        startAdornment: <EmailIcon position="start" style={{marginRight:'10px', color:'var(--neutral---main750)'}}/>,
                        endAdornment: email && (
                            <InputAdornment  position="end">
                                <IconButton onClick={handleClearEmail}>
                                    <CloseIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    margin="normal"
                    InputLabelProps={{
                        sx: {
                            '&.Mui-focused': {
                                color: 'var(--success---main900)', // label color when focused
                            },
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey', // default border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--success---main500)', // border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--success---main900)', // border color when focused
                            },
                        },
                    }}
                />
                <TextField /* password */
                    fullWidth
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    placeholder="Enter Your Password"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: <LockIcon position="start" style={{marginRight:'10px', color:'var(--neutral---main750)'}}/>,
                        endAdornment: password && (
                            <InputAdornment  position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon /> }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    margin="normal"
                    InputLabelProps={{
                        sx: {
                            '&.Mui-focused': {
                                color: 'var(--success---main900)', // label color when focused
                            },
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey', // default border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--success---main500)', // border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--success---main900)', // border color when focused
                            },
                        },
                    }}
                />
                <TextField /* confirm password */
                    fullWidth
                    variant="outlined"
                    type={showConfPassword ? 'text' : 'password'}
                    label="Confirm Your Password"
                    value={confPass}
                    placeholder="Enter Your Password Again"
                    onChange={(e) => setConfPassword(e.target.value)}
                    error={Boolean(errors.confPass)}
                    helperText={errors.confPass}
                    required={true}
                    InputProps={{
                        startAdornment: <LockIcon position="start" style={{marginRight:'10px', color:'var(--neutral---main750)'}}/>,
                        endAdornment: confPass && (
                            <InputAdornment  position="end">
                                <IconButton onClick={handleShowConfPassword}>
                                    {showConfPassword ? <VisibilityOffIcon/> : <VisibilityIcon /> }
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    margin="normal"
                    InputLabelProps={{
                        sx: {
                            '&.Mui-focused': {
                                color: 'var(--success---main900)', // label color when focused
                            },
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey', // default border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--success---main500)', // border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--success---main900)', // border color when focused
                            },
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary" 
                    fullWidth
                    style={{ 
                        marginTop: '1rem', 
                        textTransform:'none', 
                        borderRadius:'15px',
                        backgroundColor:"var(--success---main700)",
                    }}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}

export default Signup;
