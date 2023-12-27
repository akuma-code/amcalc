import { DevTool } from '@hookform/devtools'
import { Box, Button, FormControl, Input, InputLabel } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { UseFormRegister, UseFormReturn } from 'react-hook-form'
import { FieldsLabelEnum } from '../../../ActionComponents/ActionTypes/ReducerTypes'
import { Fn_Args_offset5 } from '../../../ActionComponents/ActionTypes/Types'
import { SingleCalcReducer } from '../../../ActionComponents/Calculators/SingleArgCalc'
import { _log } from '../../../Helpers/HelpersFns'
import { AnyArg, useDinamicFields_ } from '../../../Hooks/useDynamicInputs'
import { useStoresContext } from '../../../Hooks/useStoresContext'
import { ISizeFull, _ArgsMaker, _ArgsMaker2 } from '../../../Interfaces/CommonTypes'
import { ANYobj } from '../../../Interfaces/MathActionsTypes'
import { FCButtonsGroup } from '../../UI/FCButtonGroup'
// import { SizeObserver } from '../../../Context/DataStore'



type Props = {
    // formStateType: InputsTypeEnum

}

const DynamicInputsForm = observer((props: Props) => {
    const { ViewConfig, RootStore, SizeStore: ArgStore } = useStoresContext()
    const AS = ViewConfig.active.store


    const [flist, control] = useDinamicFields_(AS)



    const save = (data: AnyArg) => {
        const payload = _ArgsMaker2(data)
        if (payload.argType === 'size_full') { ArgStore?.add(payload) }
        RootStore.saveTostore(AS, payload)
        control.reset()
        // _log(SingleCalcReducer(payload))
        // _log("saved ", _ArgsMaker2(data))
        // if ('width' in data) { SizeObserver.notify(data) }
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            onSubmit={control.handleSubmit(save)}
            autoComplete="on"
            id='dform'
            display={'flex'}
            flexDirection={'column'}
            height={'fit-content'}
            margin={1}
            alignItems={'stretch'}
        >
            <FCButtonsGroup />
            <ListOfInputs fields={flist} methods={control} />

            <ControlBtns form_id='dform' />

            {/* {ViewConfig.visible.devtools && <DevTool control={control.control} />} */}
        </Box>
    )
})


DynamicInputsForm.displayName = "***Dynamic Input Form"

export type IRegInput<T extends ANYobj> = {
    register: UseFormRegister<T>
    name: string
    label?: string
}
type InputFieldBlock = {
    fieldName: string
    order?: number
}

type ListOfInputsProps = {
    fields: InputFieldBlock[]
    methods: UseFormReturn<ISizeFull | Fn_Args_offset5>
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


export function UnControlledInput({ register, name, ...rest }: IRegInput<ISizeFull | Fn_Args_offset5>) {

    return (
        <FormControl variant="standard" margin='dense' >
            <InputLabel htmlFor={`input_` + name}>{FieldsLabelEnum[name as keyof AnyArg] || ""}</InputLabel>
            <Input id={`input_` + name}
                {...register(name as keyof AnyArg, { required: true, shouldUnregister: true, valueAsNumber: true, })}
                {...rest}
            />
        </FormControl>
    )
}

const ListOfInputs: React.FC<ListOfInputsProps> = ({ fields, methods }) => {
    const sortFields = (fields_: InputFieldBlock[]) => fields_.sort((a, b) => a.order! - b.order!)
    const sorted = sortFields(fields)

    return (
        <Box justifyContent={'space-evenly'} display={'flex'} flexDirection={'column'}>
            {
                sorted.map(item =>
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
