import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    Alert,
    Link
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axiosClient from "../../axios/axios";

export const LogIn = ({ onLogin }) => {
    const [input, setInput] = useState({});
    const [error, setError] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (input.login_name.length < 3) {
            setErrs((prev) => ({ ...prev, login_name: "Login name must be at least 3 characters" }));
            return;
        }
        if (input.password.length < 3) {
            setErrs((prev) => ({ ...prev, password: "Password must be at least 3 characters" }));
            return;
        }

        try {

            const response = await axiosClient.post("/admin/login", {
                username: input.login_name,
                password: input.password
            });

            if (response.status === 200) {
                const user = response.data;
                console.log("Login successful:", user);
                onLogin(user);
                navigate(`/users/${user.userId}`);
            }
        } catch (e) {
            console.error(e);
            setError("Login failed: Invalid username or password");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errs.login_name}
                        helperText={errs.login_name}
                        id="login_name"
                        label="Login Name"
                        name="login_name"
                        autoComplete="username"
                        value={input.login_name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errs.password}
                        helperText={errs.password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={input.password}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link component={RouterLink} to="/register" variant="body2">
                            {"Don't have an account? Register Me"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};