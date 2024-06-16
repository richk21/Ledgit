import React, { useContext, useEffect, useState } from "react";
import { useLogin } from "../../utils/loginContext";
import { TextField, Button, Container, Box, InputAdornment, IconButton } from "@mui/material";
import { EmailOutlined as EmailIcon, LockOutlined as LockIcon, Close as CloseIcon,  Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, PersonOutline as Person} from "@mui/icons-material";
import './Login.css' 
import getWeb3 from "../../utils/getWeb3";
import BlogContract from '../../SmartContracts/build/contracts/Blog.json'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {isloggedin, login, logout } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [errors, setErrors] = useState({
        email:'',
    })
    const navigate = useNavigate()

    const handleClearEmail = () =>{
        setEmail("")
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const validate = () =>{
        let tempErrors = {email:'', password:''};
        let isValid = true;

        if(!email){
            tempErrors.email="Email is required";
            isValid = false;
        }else if (!/\S+@\S+\.\S+/.test(email)) {
            tempErrors.email = "This email is not valid";
            isValid = false;
        }

        //add validation for if password is incorrect

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
    useEffect(()=>{
        console.log("IS LOGGED IN:", isloggedin, "name: ", );
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
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

                const result = await instance.methods.login(email, password).call({ from: accounts[0] });
                console.log("Login result: ", result);

                if (result) {
                    console.log("Login Successful!");
                    login()
                    navigate('/')
                } else {
                    alert("Login Failed!");
                }
            } catch (error) {
                console.error("Login failed: ", error);
                alert("Login Failed!");
            }
        }
    }

    return (
        <Container className="signup-container" maxWidth="sm">
            <Box component="form" className="signup-form" noValidate autoComplete="off" onSubmit={handleLogin}>
            <div className="title-container">
                <div className="title"> Login</div>
                <div className="subtitle">Welcome Back! Let's Keep Your Stories Alive and Inspire Others!</div>
            </div>
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
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
