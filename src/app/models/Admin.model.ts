export class Admin {
  public photoURL: string = 'assets/img/avatar/avatar_profile.png';
  adminKey: string;
  constructor(
    public firstname?: string,
    public lastname?: string,
    public blocked?: boolean
  ) {}
}
