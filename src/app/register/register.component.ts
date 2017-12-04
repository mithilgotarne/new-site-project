import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

declare var $: any;

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	title = {
		eng: 'Register',
		mar: 'सभासद नोंदणी'
	};

	member: any;
	codeError = false;
	registerSuccess = false;
	registerError = false;
	numberExists = false;
	recaptchaVerifier = null;
	confirmationResult = null;
	loading = false;

	constructor(private _auth: AngularFireAuth, private _db: AngularFireDatabase) {

		$('.modal').modal({
			backdrop: 'static',
			show: false
		});

		_auth.auth.languageCode = localStorage.getItem('lang') && localStorage.getItem('lang') == 'eng' ? 'en': 'mr';

	}

	ngOnInit() {
		this.newMember();
		this.newCap();
	}

	newCap(){

		this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
			'size': 'invisible',
			'callback': response => {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				console.log(response);
				$('#sign-in-button').click(e=> this.onSubmit()).click();

			}
		});
		this.recaptchaVerifier.render();
	}

	newMember() {
		this.member = {
			name: '',
			village: '',
			number: ''
		}
	}

	onSubmit() {

		this.registerSuccess = false;
		this.numberExists = false;
		this.registerError = false;
		this.loading = true;
		this._db.database.ref('/users/' + this.member.number).once('value')
			.then(snapshot => {
				console.log(snapshot);
				if (snapshot.val()) {
					this.numberExists = true;
					alert("क्षमस्व, मोबाइल नंबर आधीच नोंदणीकृत आहे \n(Sorry, Mobile Number already registered)");
					this.loading = false;
				} else {
					this._auth.auth.signInWithPhoneNumber('+91'+this.member.number, this.recaptchaVerifier)
					.then(confirmationResult => {
					// SMS sent. Prompt user to type the code from the message, then sign the
					// user in with confirmationResult.confirm(code).
						console.log(confirmationResult);
						this.confirmationResult = confirmationResult;
						this.loading = false;
						this.codeError = false;
						$('.modal').modal('show');

					}).catch((error) =>{
					// Error; SMS not sent
					// ...
						console.log(error);
						this.loading = false;
						this.registerError = error;
					});
				}
			});
	}

	verify(code: string, form) {
		this.codeError = false;
		this.loading = true;
		if(!this.confirmationResult) return;
		this.confirmationResult.confirm(code).then( (result) => {
		// User signed in successfully.
		//var user = result.user;
			$('.modal').modal('hide');
		 	this._db.database.ref('/users/' + this.member.number).set(this.member);
		 	this.registerSuccess = true;
			this.loading = false;
			this.newMember();
			form.reset();
		// ...
		}).catch( (error) =>{
		// User couldn't sign in (bad verification code?)
			console.log(error);
			this.codeError = true;
			this.loading = false;
		// ...
		});
	}

}
