import React from 'react';
import FormSide from '../components/FormSide';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme => ({}));

export default function SignUp() {
	const confirmSignUp = data => {
		let obj = {
			campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
			data: data
		};
	};
	axios.post('https://api.raisely.com/v3/signup', obj).then(res => {});

	const validateEmail = email => {
		axios.post('https://api.raisely.com/v3/check-user', email).then(res => {});
	};
	const classes = useStyles();
	const theme = useTheme();
	console.log(theme);

	return (
		<>
			<FormSide validateEmail={validateEmail} signUp={confirmSignUp} />
		</>
	);
}
