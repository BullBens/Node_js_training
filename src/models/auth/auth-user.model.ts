export interface AuthUserModel {
  id: string;
  login: string;
  email: string;
  photo: string | null
  type: number;
  city: string;
  coins: number;
  classification: number;
  isAdmin: boolean;
  confirmed:boolean;
  invitationHashCode: string;
}
