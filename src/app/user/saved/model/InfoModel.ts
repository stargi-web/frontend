export interface InfoModel{
    id?: number,
    ruc?: string,
    businessName?: string,
    country?: string,
    stage?:string,
    commentary?:string,
    updatedAt:string|Date,
    expirationAt:string|Date,
    closeAt:string|Date
}