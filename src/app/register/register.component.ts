import { Component, OnInit } from '@angular/core';
import { SmsService } from '../shared/sms.service';
import * as firebase from 'firebase';
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
	code: any;
	codeError = false;
	registerSuccess = false;
	registerError = false;
	numberExists = false;

	constructor(private sms: SmsService) {

		$('.modal').modal({
			backdrop: 'static',
			show: false
		});
	}

	ngOnInit() {
		this.newMember();
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
		firebase.database().ref('/users/' + this.member.number).once('value')
			.then(snapshot => {
				if (snapshot.val()) {
					this.numberExists = true;
				} else {
					this.code = this.sms.getCode(this.member.number);
					this.sms.send(this.member.number, 'Your OTP for registration amitghoda.com: ' + this.code)
						.subscribe(res => {
							if (res.status == "success") {
								this.codeError = false;
								console.log(res);
								$('.modal').modal('show');
							} else {
								this.registerError = res;
								console.log(res);
							}
						})
				}
			});
	}

	verify(code: string) {
		this.codeError = false;
		if (this.code == code) {
			$('.modal').modal('hide');
			firebase.database().ref('/users/' + this.member.number).set(this.member);
			this.registerSuccess = true;
		} else {
			this.codeError = true;
		}
	}

}
