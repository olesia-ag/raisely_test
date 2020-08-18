import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/okVXy9tG3KY)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function FormSide(props) {
	const classes = useStyles();
	let displayButton;
	if (props.errorMessage.length === 0) {
		displayButton = (
			<Button
				type='submit'
				fullWidth
				disabled={
					props.firstName.length === 0 ||
					props.lastName.length === 0 ||
					props.email.length === 0 ||
					props.password.length === 0 ||
					props.firstNameHelper.length !== 0 ||
					props.lastNameHelper.length !== 0 ||
					props.emailHelper.length !== 0 ||
					props.passwordHelper.length !== 0
				}
				variant='contained'
				color='primary'
				className={classes.submit}
				onClick={props.onSubmit}>
				Sign Up
			</Button>
		);
	} else {
		displayButton = (
			<Typography variant='button'>{props.errorMessage}</Typography>
		);
	}
	let displayForm;
	if (props.successStatus) {
		displayForm = (
      <div className={classes.paper}><Typography variant='button'>{props.successStatus}</Typography></div>
		);
	} else {
		displayForm = (
    <div className={classes.paper}>
      <Typography component='h1' variant='h5'>
						Sign up
					</Typography>
			<form className={classes.form} noValidate>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='firstName'
					label='First Name'
					name='firstName'
					autoComplete='given-name'
					autoFocus
					error={props.firstNameHelper.length !== 0}
					helperText={props.firstNameHelper}
					value={props.firstName}
					onChange={props.setFirstName}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='lastName'
					label='Last Name'
					name='lastName'
					autoComplete='family-name'
					autoFocus
					error={props.lastNameHelper.length !== 0}
					helperText={props.lastNameHelper}
					value={props.lastName}
					onChange={props.setLastName}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					autoFocus
					error={props.email.exist || props.emailHelper.length !== 0}
					helperText={
						props.email.exist
							? 'Oops! This email is already in our system'
							: props.emailHelper
					}
					value={props.email.value}
					onChange={props.setEmail}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
					error={props.passwordHelper.length !== 0}
					helperText={props.passwordHelper}
					value={props.password}
					onChange={props.setPassword}
				/>
				{displayButton}
			</form>
      </div>
		);
	}
	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {displayForm}
			</Grid>
		</Grid>
	);
}
