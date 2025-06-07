import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Box from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useNavigate } from 'react-router-dom';

export default function LoginFinal(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('member');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    const user = { email, role: selectedRole };
    localStorage.setItem('user', JSON.stringify(user));

    navigate(selectedRole === 'admin' ? '/dashboard' : '/team-dashboard');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #c3ecb2, #7cd3e6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssVarsProvider {...props}>
        <CssBaseline />
        <Sheet
          sx={{
            width: 360,
            p: 4,
            borderRadius: 'lg',
            boxShadow: 'lg',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography level="h4" component="h1" textAlign="center">
            <b>Tasks Tracker</b>
          </Typography>
          <Typography level="body-sm" textAlign="center">
            Please sign in to continue
          </Typography>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Role</FormLabel>
            <Select
              value={selectedRole}
              onChange={(e, value) => setSelectedRole(value)}
              size="sm"
              fullWidth
            >
              <Option value="admin">Admin</Option>
              <Option value="member">Team Member</Option>
            </Select>
          </FormControl>

          <Button onClick={handleLogin} sx={{ mt: 1 }}>
            Log in
          </Button>

          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            sx={{ fontSize: 'sm', alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
}