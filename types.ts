export type APIError = {
    statusCode: number,
    statusMessage: string,
    message: string,
    data?: Record<string, string>
}

export type State = {
    isLoading: boolean,
    appError: APIError | null
    isConfirmModalVisible: boolean
}