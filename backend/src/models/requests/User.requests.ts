export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  username: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutBody {
  refresh_token: string
}

export interface ForgotPasswordBody {
  email: string
}

export interface VerifyOTPBody {
  otp: string
}

export interface RefreshTokenBody {
  refresh_token: string
}
