import { Avatar, Button, Divider, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Form as HookForm, useFieldArray, useForm } from 'react-hook-form';
import { Params, redirect } from 'react-router-dom';
import { _ID, _log } from '../../../Helpers/HelpersFns';
import { useStoresContext } from '../../../Hooks/useStoresContext';
import { A_Sill } from '../../../Interfaces/CommonTypes';

type SillFormProps = {}



export type FActionLoaderProps = { request: Request, params: Params }


type SillFormRow = {
    L: string,
    B: string,
    count: number
}
export type SillFormValues = {
    row: SillFormRow[]
}

const defVals: SillFormValues = {
    row: [
        { L: "" as const, B: "" as const, count: 1 }
    ]
}
//! Hook FORM                                                 
export const SillFormHooked: React.FC<SillFormProps> = observer(() => {
    const { SillStore } = useStoresContext()
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<SillFormValues>({
        defaultValues:
            { row: [{ L: "", B: "", count: 1 }] }
    });
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'row'

    });

    const watchFieldArray = watch('row');
    const CFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    const add = () => {
        const newLine = defVals.row
        append(newLine)
    }
    const saveData = (data: SillFormValues) => {
        const d = data.row.map(r => ({ ...r, L: +r.L, B: +r.B }))
        const conv = d.map(v => new A_Sill(v.L, v.B, v.count))
        SillStore && SillStore.add(conv)
    }
    return (
        <HookForm name='sill-form' action='groups' method='post' id='sf' control={control}
            onSubmit={({ data }) => saveData(data)}
        >



            {CFields.map((f, idx) =>
                <Stack flexDirection={'row'} key={f.id}
                    useFlexGap gap={1}
                    alignItems={'stretch'} p={1}
                >
                    <Avatar variant='square' sx={{ alignSelf: 'center' }}>{idx + 1}</Avatar>
                    <TextField sx={{ flexGrow: 0 }}
                        // id={"LInput" + idx}
                        label="Длина"
                        placeholder={'L'}
                        {...register(`row.${idx}.L` as const, { required: true, shouldUnregister: true, valueAsNumber: true })}
                        variant='filled'
                        size='small'
                        helperText={errors ? errors?.root?.message : ""} />
                    <TextField sx={{ flexGrow: 0 }}
                        // id={"BInput" + idx}
                        label="Ширина"
                        {...register(`row.${idx}.B` as const, { required: true, shouldUnregister: true, valueAsNumber: true })}
                        size='small'
                        variant='filled' />
                    <TextField sx={{ flexGrow: 0 }}
                        // id={"CountInput" + idx}
                        label="Кол-во"
                        {...register(`row.${idx}.count` as const, { required: true, shouldUnregister: true, valueAsNumber: true })}
                        size='small'
                        variant='filled' />
                    <Button variant='contained' onClick={add}>Add</Button>
                    <Button variant='contained' onClick={() => remove(idx)}>Delete</Button>

                </Stack>
            )}

            <Divider>
                <span>ControlledInputsForm =&gt; </span> <Button type='submit' variant='outlined' sx={{ px: 1, mx: 1, }} form={'sf'}> Submit</Button>
            </Divider>
            {/* <DevTool control={control} /> */}
        </HookForm>
        // </Box>
    )


})


SillFormHooked.displayName = "*** Hook Sill Form"


//__ action                                                                      
export const form_action = async ({ request, params }: FActionLoaderProps) => {
    const fd = await request.formData()
    params && _log('params: ', params)
    // console.log('fd', Object.fromEntries(fd.entries()))
    const grp_id = _ID()
    const groups = { grp_id, group: [Object.fromEntries(fd)] }

    // const groups = { _groupId: groupId, grs:  }
    console.log('groups(action): ', groups)

    redirect(`/groups/:${grp_id}`)
    return groups
}
//__ loader                                                                     
export const form_loader = async ({ request, params }: FActionLoaderProps) => {
    const data = await request.formData()
    const { gr_id } = params
    _log("form: ", data)
    _log("groupID: ", gr_id)
    return Object.fromEntries(data)
}
