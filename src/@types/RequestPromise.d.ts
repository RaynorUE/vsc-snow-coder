declare interface rpError {
    name: "StatusCodeError" | any,
    statusCode: number,
    message: string,
    error: string
}