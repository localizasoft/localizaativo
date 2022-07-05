export interface IInput {
    type?: string | "text"
    label?: string
    value?: string
    onChange: (ev: any) => void
    showPassword?: boolean
    setShowPassword?: any
    color?: string | object
    helperText?: string | ""
    error?: boolean | false
}