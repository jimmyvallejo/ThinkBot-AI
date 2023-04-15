import * as React from 'react';
import Button from "../components/Buttton";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { colors } from "../styles/colors";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Welcome() {
  const blueColor = `rgba(30, 84, 183, 1)`;
  const but_style = {
    width: '343px',
    height: '90px',
    marginBottom: 20,
  }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: "linear-gradient(180deg, #7B7B87 0%, #DFEFF1 33.33%, #1E54B7 66.67%, #23408F 100%)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> 
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" style={{
          marginBottom: '2rem',
          fontSize: 70,
          fontWeight: 900
            }}>
              Welcome to
            </Typography>
            <Typography component="h1" variant="h5" style={{
          marginBottom: '2rem',
          fontSize: 50,
          fontWeight: 900,
          color: colors.blues[500],
            }}>
              ThinkBot
            </Typography>
            <Typography component="h1" variant="h5" style={{
          marginBottom: '2rem',
          fontSize: 50,
            }}>
              Your personal AI tutor
            </Typography>
            <Typography component="h1" variant="h5" style={{
          marginBottom: '2rem',
          fontSize: 30,
          color: blueColor,
          textAlign: "center"
            }}>
            with the help of AI giving our student the world
            </Typography>
            <Button style={but_style}
                  href="/register"
                >
                  Sign Up
                </Button>
           <Button style={but_style}
                  href="/login"
                >
                  Logins
                </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}