import { StandardInput } from "../../shared/Input/StandardInput"
import { ITerceiraParte } from "../Interfaces/ITerceiraParte"

const TerceiraParte = (props: ITerceiraParte) => {
    return (
        <>
            <StandardInput
                type="password"
                color="primary"
                label="Password"
                value={props.password}
                onChange={props.onChangePassword}
                showPassword={props.showPassword}
                setShowPassword={props.setShowPassword}
            />
            <StandardInput
                type="password"
                color="primary"
                label="Confirm Password"
                value={props.confirmPassword}
                onChange={props.onChangeConfirmPassword}
                showPassword={props.showConfirmPassword}
                setShowPassword={props.setShowConfirmPassword}
            />
        </>
    )
}

export { TerceiraParte }