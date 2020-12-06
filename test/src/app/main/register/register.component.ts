import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { People } from 'src/app/people';
import { RegisterService } from 'src/app/register.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('name') nameClient?: ElementRef;

  people$?: Observable<People[]>;
  
  formRegister = this.fb.group({
    id: [undefined],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    food: ['', [Validators.required]]
  });

  
  
  foods: string[] = ['Buguer', 'Pizza', 'Fries', 'Assaí', 'Sushi', 'Cookies', 'Cake', 'Ice Cream', 'Chips', 'capim'];

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService) { }

  ngOnInit(): void {
    this.people$ = this.registerService.getPeople();
  }

  onSubmit() {
    const p: People = this.formRegister.value;
    if(!p.id) {
      this.addClient(p)
    } else {
      this.editClient(p)
    }
  }

  addClient(p: People) {
    this.registerService.register(p)
      .then( () => {
        console.log('Client ', p.name, ' add with successfuly!')
        this.formRegister.reset();
        this.nameClient?.nativeElement.focus();
      })
      .catch( (e) => {
        console.log(e);
      })
  }

  deleteClient(p: People) {
    this.registerService.delete(p)
      .then( () => {
        console.log('Client ', p.name, ' removed with successfuly!')
        this.nameClient?.nativeElement.focus();
      })
      .catch( (e) => {
        console.log(e);
      })
  }

  editClient(p: People) {
    this.registerService.update(p)
    .then( () => {
      console.log('Client ', p.name, ' updated with successfuly!')
      this.nameClient?.nativeElement.focus();
      this.formRegister.reset()
    })
    .catch( (e) => {
      console.log(e);
    })
  }

  edit(p: People) {
    this.formRegister.setValue(p);
  }

  cancel() {
    this.formRegister.reset();
    this.nameClient?.nativeElement.focus()
  }

}
