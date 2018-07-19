import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  user: FormControl;
  password: FormControl;
  
  error: object;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      // 'user': [null, [Validators.required, Validators.minLength(5)]],
      // 'password': [null, [Validators.required, Validators.minLength(5)]]
      'user': [null],
      'password': [null]
    });
  }

  login(credential) {
    this.auth.login(credential).subscribe(result => {
      console.log('result', result);
      if (!result) {
        return;
      }
      // data setting
      // (<FormControl>this.myForm.controls['username']).setValue('John', {onlySelf: true});
      // (<FormGroup>this.myForm).setValue(people, { onlySelf: true });
      //this.eventService.dispatchEvent('login:success');
      this.router.navigateByUrl('/monitoring/dashboard');
    }, 
    error => {
      console.log('login error', error);
      this.error = error;
    });//,
    // () => {
    //   console.log('login success');
    // });
  }
}