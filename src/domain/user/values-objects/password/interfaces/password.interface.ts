export interface PasswordInterface {
  encryptPassword: () => void;
  comparePasswords: (plainText: string) => boolean;
}
