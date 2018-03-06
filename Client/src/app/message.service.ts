import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }
  isError : boolean;
  isSuccess : boolean;
  message: string;
  viewError(err: string){
    this.isError = true;
    this.isSuccess = false;
    this.message = err;
  }
  viewSuccess(msg: string){
    this.isError = false;
    this.isSuccess = true;
    this.message = msg;
  }

}
