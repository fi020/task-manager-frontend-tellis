import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskLoader from "../components/Loader";

const Register: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const msg = await register(email, password);
      setMessage(msg);
      navigate("/login");
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <TaskLoader message="creating account..." />
  }
  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} mt={5}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Sign Up</Button>
        {message && <p>{message}</p>}

      </Box>
    </Container>
  );
};

export default Register;
