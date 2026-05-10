import axios from "axios";
import React, { useEffect } from "react";
import axiosClient from "../../axios/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container, Paper, Box, Typography, Button, Link, TextField } from "@mui/material";

export const Register = () => {
    const [register, setRegister] = React.useState({
        username: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        location: "",
        occupation: "",
        description: ""
    });
    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegister((prev) => ({ ...prev, [name]: value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!register.username) {
            newErrors.username = "Username is required";
        }

        if (!register.password) {
            newErrors.password = "Password is required";
        } else if (register.password.length < 3) {
            newErrors.password = "Password must be at least 3 characters";
        }

        if (register.password !== register.confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
        }

        if (!register.first_name) {
            newErrors.first_name = "First name is required";
        }

        if (!register.last_name) {
            newErrors.last_name = "Last name is required";
        }

        if (!register.location) {
            newErrors.location = "Location is required";
        }

        if (!register.occupation) {
            newErrors.occupation = "Occupation is required";
        }

        if (!register.description) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            console.log("Registering user with data:", register);
            const registerUser = async () => {
                try {
                    const response = await axiosClient.post("/admin/register", register);
                    if (response.data.errCode === 0) {
                        navigate("/login");
                    } else if (response.data.errCode === 2) {
                        alert("Username already exists");
                    } else {
                        alert("An error occurred while registering the user.");
                    }
                    setRegister({
                        username: "",
                        password: "",
                        confirm_password: "",
                        first_name: "",
                        last_name: "",
                        location: "",
                        occupation: "",
                        description: ""
                    });
                } catch (error) {
                    console.error("Error registering user:", error);
                }
            };

            registerUser();
        }
    };

    return (

        <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={register.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={register.password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password}
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        id="confirm_password"
                        autoComplete="current-password"
                        value={register.confirm_password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.first_name}
                        helperText={errors.first_name}
                        id="first_name"
                        label="First Name"
                        name="first_name"
                        autoComplete="given-name"
                        value={register.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.last_name}
                        helperText={errors.last_name}
                        id="last_name"
                        label="Last Name"
                        name="last_name"
                        autoComplete="family-name"
                        value={register.last_name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.location}
                        helperText={errors.location}
                        id="location"
                        label="Location"
                        name="location"
                        autoComplete="address-level2"
                        value={register.location}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.occupation}
                        helperText={errors.occupation}
                        id="occupation"
                        label="Occupation"
                        name="occupation"
                        autoComplete="organization-title"
                        value={register.occupation}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description}
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="off"
                        value={register.description}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>

                    <Box sx={{ textAlign: 'center' }}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            {"Already have an account? Login here."}
                        </Link>
                    </Box>

                </Box>
            </Paper>
        </Container >



        // <div style={{ display: "flex", flexDirection: "column" }}>
        //     <input type="text" name="username" placeholder="username" onChange={handleChange} />
        //     {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        //     <input type="password" name="password" placeholder="password" onChange={handleChange} />
        //     {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        //     <input type="password" name="confirm_password" placeholder="confirm password" onChange={handleChange} />
        //     {errors.confirm_password && <p style={{ color: "red" }}>{errors.confirm_password}</p>}
        //     <input type="text" name="first_name" placeholder="first name" onChange={handleChange} />
        //     {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
        //     <input type="text" name="last_name" placeholder="last name" onChange={handleChange} />
        //     {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
        //     <input type="text" name="location" placeholder="location" onChange={handleChange} />
        //     {errors.location && <p style={{ color: "red" }}>{errors.location}</p>}
        //     <input type="text" name="occupation" placeholder="occupation" onChange={handleChange} />
        //     {errors.occupation && <p style={{ color: "red" }}>{errors.occupation}</p>}
        //     <input type="text" name="description" placeholder="description" onChange={handleChange} />
        //     {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        //     <button onClick={() => onSubmit(register)}>Register</button>
        //     <p> <a href="/login">Already have an account? Login here.</a> </p>
        // </div>
    );
};