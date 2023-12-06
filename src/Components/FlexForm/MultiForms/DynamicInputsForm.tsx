import { UseFormRegister, UseFormReturn } from 'react-hook-form'
import { observer } from 'mobx-react-lite'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material'
import { _ID, _log } from '../../../Helpers/HelpersFns'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import { InputsTypeEnum } from '../../../Hooks/useFormStateSelector'
import { AnyArg, useDinamicFields_ } from '../../../Hooks/useDynamicInputs'
import { FieldsLabelEnum } from '../../../ActionComponents/ActionTypes/ReducerTypes'
import { DevTool } from '@hookform/devtools'
import { _isFullSize } from '../../../Interfaces/CommonTypes'
import { SizeObserver } from '../../../Context/DataStore'


type Props = {
    formStateType: InputsTypeEnum

}

const DynamicInputsForm = observer((props: Props) => {
    const { RootStore } = useStoresContext()
    const AS = props.formStateType


    const [flist, control] = useDinamicFields_(AS)



    const save = (store_id: InputsTypeEnum, data: AnyArg) => {
        _log("saved to ", store_id, data)
        if ('width' in data) { SizeObserver.notify(data) }
        RootStore.saveTostore(store_id, data)
        control.reset()
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={control.handleSubmit((d) => save(AS, d))}
            autoComplete="on"
            id='dform'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
            margin={1}
        >

            <ListOfInputs fields={flist} methods={control} />

            <ControlBtns form_id='dform' />

            <DevTool control={control.control} />
        </Box>
    )
})


DynamicInputsForm.displayName = "DynamicInputForm"

export type IRegInput<T extends ANYobj> = {
    register: UseFormRegister<T>
    name: string
    label?: string
}
type ListOfInputsProps = {
    fields: { fieldName: string }[]
    methods: UseFormReturn<AnyArg>
}
const ControlBtns: React.FC<{ form_id: string }> = (props) => {
    const { form_id } = props
    return <Box justifyContent={'space-evenly'} display={'flex'}>
        <Button type='submit'
            form={form_id}
            variant='contained'
            color='success'
            sx={{ margin: 1 }}
        >
            SUBMIT
        </Button>
        <Button type='reset'
            form={form_id}
            variant='contained'
            color='error'
            sx={{ margin: 1 }}
        >
            RESET
        </Button>
    </Box>
}


export function UnControlledInput({ register, name, ...rest }: IRegInput<AnyArg>) {

    return (
        <FormControl variant="standard" margin='dense' >
            <InputLabel htmlFor={`input_` + name}>{FieldsLabelEnum[name as keyof AnyArg] || ""}</InputLabel>
            <Input id={`input_` + name}
                {...register(name as keyof AnyArg, { required: true, shouldUnregister: true, valueAsNumber: true })}
                {...rest}
            />
        </FormControl>
    )
}

const ListOfInputs: React.FC<ListOfInputsProps> = ({ fields, methods }) => {


    return (
        <Box justifyContent={'space-evenly'} display={'flex'} flexDirection={'column'}>
            {
                fields.map(item =>
                    <UnControlledInput name={item.fieldName} register={methods.register} key={item.fieldName} />
                )}
        </Box>)
}


// function UcInput(props: UseControllerProps<AnyArg>) {
//     const { field } = useController(props);
//     const { name, onBlur, onChange, value, ref } = field

//     return <FormControl variant="standard" key={name} margin='dense'>
//         <InputLabel htmlFor={`input_` + name}>{field.name}</InputLabel>
//         <Input id={`input_` + name}
//             value={value}
//             onChange={onChange}
//             onBlur={onBlur}
//             ref={ref}
//         />

//     </FormControl>
// }

export default DynamicInputsForm
