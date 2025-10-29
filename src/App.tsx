import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';

interface FormValues {
  username: string;
  numberphone: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    numberphone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be at least 10 digits")
      .max(11, "Must be at most 11 digits"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

function App() {
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submitButton = (data: FormValues) => {
    setSubmittedData(data);
    reset()
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
      }}
    >
      <form
        onSubmit={handleSubmit(submitButton)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px',
          width: '320px',
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          {...register('numberphone')}
          error={!!errors.numberphone}
          helperText={errors.numberphone?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h3>Submitted Data</h3>
          <p><strong>Username:</strong> {submittedData.username}</p>
          <p><strong>Phone:</strong> {submittedData.numberphone}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </Box>
  );
}
export default App;
