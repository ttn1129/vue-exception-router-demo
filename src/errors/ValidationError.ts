export default class ValidationError implements Error
{
  public name:string = 'ValidationError';
  constructor(public message: string) {
  }
  toString() {
    return this.name + ': ' + this.message;
  }
}