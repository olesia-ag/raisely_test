import React, { useState, useEffect } from 'react';
import FormSide from '../components/FormSide';
import axios from 'axios';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [firstNameHelper, setFirstNameHelper] = useState('');
	const [lastName, setLastName] = useState('');
	const [lastNameHelper, setLastNameHelper] = useState('');
	const [email, setEmail] = useState('');
	const [emailHelper, setEmailHelper] = useState('');
	const [password, setPassword] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  const [error, setError] = useState('')
  const [status, setStatus] = useState(null)

	const onChange = event => {
    let valid;
    setError('')
		switch (event.target.id) {
			case 'email':
				setEmail(event.target.value);
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
				setFirstName(event.target.value);
				valid = /^[a-zA-Z]+$/.test(event.target.value);
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

	//if the user stopped typing in an email field for 0.5 sec, send a request to check:
	useEffect(() => {
		const timer = setTimeout(() => {
			if (emailHelper.length === 0 && email.length !== 0) {
				axios
					.post('https://api.raisely.com/v3/check-user', {
						campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
						data: { email: email }
					})
					.then(res => {
						if (res.data.data.status === 'EXISTS') {
							setEmailHelper('Oops! this email already exists in our system');
						}
					});
			}
		}, 600);
		//this function will run before same useEffect runs again
		//(if the effect runs once ([]) the cleanup function will only run when component unmounted
		return () => {
			clearTimeout(timer);
		};
	}, [emailHelper, email]);

	const onSubmit = event => {
		event.preventDefault();
		let obj = {
			campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
			data: {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			}
		};

		axios
			.post('https://api.raisely.com/v3/signup', obj)
			.then(res => {
        if(res.status === 200)
        setStatus(res.data.message)
        else{
          setError('Oops! Something went wrong')
        }
      })
			.catch(err => {
        setError(err.response.data.errors[0].message)
      });
	};
	return (
		<>
			<FormSide
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
        onSubmit={event => onSubmit(event)}
        errorMessage = {error}
        successStatus = {status}
			/>
		</>
	);
}
