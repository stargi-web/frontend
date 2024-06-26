export interface CreateUserModel{
    userName?:string,
    password?:string,
    firstName?:string,
    lastName?:string,
    birthDate?:string,
    roles?:{name:string}[]
}