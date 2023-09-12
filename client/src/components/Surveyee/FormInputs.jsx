import LongAnswer from "./LongAnswer"
import ShortAnswer from "./ShortAnswer"
import MultipleChoice from "./MultipleChoice"
import useFormContext from "../../hooks/useFormContext"

const FormInputs = () => {

    const { page } = useFormContext()

    const display = {
        0: <MultipleChoice />,
        1: <ShortAnswer />,
        2: <LongAnswer />
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs