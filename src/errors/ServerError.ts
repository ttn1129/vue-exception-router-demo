export default class ServerError implements Error
{
  public name:string = 'ServerError';
  constructor(public message: string) {
  }
  toString() {
    return this.name + ': ' + this.message;
  }
}