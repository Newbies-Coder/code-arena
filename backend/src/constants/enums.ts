export enum UserVerifyStatus {
  Unverified = 'Unverified',
  Verified = 'Verified',
  Celerity = 'Celerity',
  Banned = 'Banned'
}

export enum UserGenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum TokenType {
  AccessToken = 'AccessToken',
  RefreshToken = 'RefreshToken',
  ForgotPasswordToken = 'ForgotPasswordToken',
  OTPVerify = 'OTPVerifyToken'
}

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}
