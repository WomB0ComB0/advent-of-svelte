export class User {
  firstName = $state('');
  lastName = $state('');
  avatar = $state('');

  greeting = $derived(
    `Hello ${this.firstName} ${this.lastName}!`
  )

  constructor(
    firstName: string,
    lastName: string,
    avatar: string
  ){
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
  }
}