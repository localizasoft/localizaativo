export interface IAlerts {
    message: string
    severity: string
    clearState: () => void
}