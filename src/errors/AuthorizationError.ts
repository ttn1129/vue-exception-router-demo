export default class AurthorizationError implements Error
{
  public name:string = 'AurthorizationError';
  constructor(public message: string) {
  }
  toString() {
    return this.name + ': ' + this.message;
  }
}