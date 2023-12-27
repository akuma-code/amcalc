import { useForm, useFieldArray } from "react-hook-form";


type FormValues = {
    rowInput: {
        name: string
        L: string,
        B: string,
        c: string,
    }[]
}
const initRow: FormValues = {
    rowInput: [{
        name: 'row',
        B: "",
        L: "",
        c: ""
    }]
}

export default function ControlledFields() {
    const { register, handleSubmit, control, watch } = useForm({ defaultValues: initRow });
    const { fields, append } = useFieldArray({
        control,
        name: 'rowInput'
    });
    const watchFieldArray = watch("rowInput");
    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });


    return (
        <form>
            {controlledFields.map((field, index) => {
                return <input {...register(`rowInput.${index}.name` as const)} />;
            })}
        </form>
    );
}