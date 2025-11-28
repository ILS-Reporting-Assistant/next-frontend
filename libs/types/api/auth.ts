export interface ApiResponseDto<T> {
    data: T
    message?: string
    success?: boolean
    statusCode?: number
}


export interface signUpDto {
    type: string
    email: string
    password: string
    firstName: string
    lastName: string
    organizationName?: string
    address?: string
}

export interface LoginDto {
    email: string
    password: string
}

export interface AuthUserDto {
    id?: string
    _id?: string
    emailAddress: string
    name?: string
    firstName?: string
    lastName?: string
    onboardingCompleted?: boolean
    [key: string]: unknown
}

export interface AuthDataDto {
    accessToken?: string
    refreshToken?: string
    expiresIn?: number
    tokenType?: string
    user?: AuthUserDto
    [key: string]: unknown
}