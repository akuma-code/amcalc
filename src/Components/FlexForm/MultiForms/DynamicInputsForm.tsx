import { FormProvider, useController, UseControllerProps, UseFormRegister } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../Hooks/useStoresContext'
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import { InputsTypeEnum } from '../../Hooks/useFormStateSelector'
import { AnyArg, useDynamicInputs } from '../../Hooks/useDynamicInputs'
import { IRootStores_v1 } from '../../../Context/RootStore'
import { FieldsLabelEnum } from '../../../ActionComponents/ActionTypes/ReducerTypes'


type RS = Required<IRootStores_v1>
type Props = {
    formStateType: InputsTypeEnum

}


interface CommonInputProps<T extends AnyArg> {
    field: keyof T & string
    register: UseFormRegister<T>
    id?: string
    label?: string
}
const DynamicInputsForm = observer((props: Props) => {
    const { RootStore } = useStoresContext()
    const AS = props.formStateType

    const [PropsArr, Methods] = useDynamicInputs(AS)

    const save = (store_id: InputsTypeEnum, data: AnyArg) => {
        _log("saved to ", store_id, data)
        // props.onSubmitFn && props.onSubmitFn(store_id, data)
        RootStore.saveTostore(store_id, data)
        Methods.reset()
    }
    return (
        // <FormProvider {...Methods}>


        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={Methods.handleSubmit((d) => save(AS, d))}
            autoComplete="on"
            id='dform'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
            margin={1}
        >

            {
                PropsArr.map(prop =>
                    <ContolInput {...prop} name={prop.field} key={prop.field} register={Methods.register} />
                )
            }
            {ControlBtns('dform')}


        </Box>



        // </FormProvider >
    )
})


DynamicInputsForm.displayName = "DynamicInputForm"


const ControlBtns = (form_id: string) => {
    return <>
        <Button type='submit'
            form={form_id}
            variant='contained'
            color='success'
        >
            SUBMIT
        </Button>
        <Button type='reset'
            form={form_id}
            variant='contained'
            color='error'
            sx={{ margin: 2 }}
        >
            RESET
        </Button>
    </>
}




export type IRegInput<T extends ANYobj> = {
    register: UseFormRegister<T>
    name: string
    label?: string
}

export function ContolInput({ register, name, ...rest }: IRegInput<AnyArg>) {

    return (
        <FormControl variant="standard" margin='dense' >
            <InputLabel htmlFor={`input_` + name}>{FieldsLabelEnum[name as keyof AnyArg] || ""}</InputLabel>
            <Input id={`input_` + name}
                {...register(name as keyof AnyArg, { required: true, shouldUnregister: true })}
                {...rest}
            />
        </FormControl>
    )
}
type ListOfInputsProps = {

}
function ListOfInputs(props: ListOfInputsProps) {

}


function UcInput(props: UseControllerProps<AnyArg>) {
    const { field } = useController(props);
    const { name, onBlur, onChange, value, ref } = field

    return <FormControl variant="standard" key={name} margin='dense'>
        <InputLabel htmlFor={`input_` + name}>{field.name}</InputLabel>
        <Input id={`input_` + name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
        />

    </FormControl>
}

export default DynamicInputsForm
