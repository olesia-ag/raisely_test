import React, { useState, useEffect, useRef } from 'react';
import FormSide from '../components/FormSide';
import axios from 'axios';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [firstNameHelper, setFirstNameHelper] = useState('');
	const [lastName, setLastName] = useState('');
	const [lastNameHelper, setLastNameHelper] = useState('');
	const [email, setEmail] = useState({ value: '', exist: false });
	const [emailHelper, setEmailHelper] = useState('');
	const [password, setPassword] = useState('');
	const [passwordHelper, setPasswordHelper] = useState('');

	const onChange = event => {
		let valid;
		switch (event.target.id) {
			case 'email':
				setEmail({ ...email, value: event.target.value });
				valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
					event.target.value
				);
				if (!valid) {
					setEmailHelper('Invalid email');
				} else {
					setEmailHelper('');
				}
				break;
			case 'firstName':
				console.log('first name:', event.target.value);
				setFirstName(event.target.value);
				valid = /^[a-zA-Z]+$/.test(event.target.value);
				console.log('valid:', valid);
				if (!valid) {
					setFirstNameHelper('First name can only contain letters');
				} else if (event.target.value.length < 2) {
					setFirstNameHelper('First name should contain at least 2 characters');
				} else if (event.target.value.length > 15) {
					setFirstNameHelper(
						'First name should not contain more that 15 characters'
					);
				} else {
					setFirstNameHelper('');
				}
				break;
			case 'lastName':
          console.log('last name:', event.target.value);
				setLastName(event.target.value);
				valid = /^[a-zA-Z]+$/.test(event.target.value);
				if (!valid) {
					setLastNameHelper('Last name can only contain letters');
				} else if (event.target.value.length < 2) {
					setLastNameHelper('Last name should contain at least 2 characters');
				} else if (event.target.value.length > 15) {
					setLastNameHelper(
						'Last name should not contain more that 15 characters'
					);
				} else {
					setLastNameHelper('');
				}
				break;
			case 'password':
				setPassword(event.target.value);
				valid = /^[a-zA-Z0-9\-_]{8,20}$/.test(event.target.value);
				if (!valid) {
					setPasswordHelper(
						'Password should be between 8 and 20 characters, and contain only letters and numbers'
					);
				} else {
					setPasswordHelper('');
				}
				break;
			default:
				break;
		}
	};
	const confirmSignUp = data => {
		let obj = {
			campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
			data: data
		};
		axios.post('https://api.raisely.com/v3/signup', obj).then(res => {});
	};
	const validateEmail = email => {
		axios.post('https://api.raisely.com/v3/check-user', email).then(res => {});
	};

	const changeEmail = value => {
		const newEmail = { ...email, value: value };
		console.log(newEmail);
		setEmail(newEmail);
	};

	//if the user stopped typing in an email field for 0.5 sec, send a request to check:
	useEffect(() => {
		const timer = setTimeout(() => {
			if (emailHelper.length !== 0) {
				axios
					.post('https://api.raisely.com/v3/check-user', {
						campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
						data: { email: 'test@test.com' }
					})
					.then(res => {
						// if (res.data.data.status === 'EXISTS' && !email.exist) {
						// 	setEmail({ ...email, exist: true });
						// } else if (res.data.data.status === 'OK' && email.exist) {
						// 	setEmail({ ...email, exist: false });
						// }
						console.log('just loggin for');
					});
			}
		}, 500);
		//this function will run before same useEffect runs again
		//(if the effect runs once ([]) the cleanup function will only run when component unmounted
		return () => {
			clearTimeout(timer);
		};
	}, [email.value, emailHelper]);

	useEffect(() => console.log(email), [email]);
	return (
		<>
			<FormSide
				validateEmail={validateEmail}
				signUp={confirmSignUp}
				firstName={firstName}
				setFirstName={event => onChange(event)}
				firstNameHelper={firstNameHelper}
				lastName={lastName}
				setLastName={event => onChange(event)}
				lastNameHelper={lastNameHelper}
				email={email}
				setEmail={event => onChange(event)}
				emailHelper={emailHelper}
				password={password}
				setPassword={event => onChange(event)}
				passwordHelper={passwordHelper}
			/>
		</>
	);
}
