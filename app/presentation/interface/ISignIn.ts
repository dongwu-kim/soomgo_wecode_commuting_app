export interface ISignInUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

export interface ISignInProps {
  handleSocialSignIn: () => void;
}
