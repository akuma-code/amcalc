import { Avatar, Button, Divider, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { FormEvent } from 'react';
import { Form, FormSubmitHandler, SubmitHandler, UseFormHandleSubmit, useFieldArray, useForm } from 'react-hook-form';
import { Params, redirect } from 'react-router-dom';
import { _ID, _log } from '../../../Helpers/HelpersFns';
import { useStoresContext } from '../../../Hooks/useStoresContext';
import { A_Sill } from '../../../Interfaces/CommonTypes';
import { DevTool } from '@hookform/devtools';
import { toJS } from 'mobx';

type SillFormProps = {}



export type FActionLoaderProps = { request: Request, params: Params }
export type SubmitFnArgumentType = {
    data: SillFormValues;
    event?: React.BaseSyntheticEvent<HTMLButtonElement, any, any> | undefined;
    formData: FormData;
    formDataJson: string;
    method?: "post" | "put" | "delete" | undefined;
}

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
    const { SillStore, ViewConfig } = useStoresContext()
    const { register, control, watch, formState: { errors }, reset } = useForm<SillFormValues, any, SillFormValues>({
        defaultValues:
            { row: [{ L: "", B: "", count: 1 }] },
        mode: 'onSubmit'
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'row'

    });
    const { handleSubmit } = control
    const watchFieldArray = watch('row');
    const CFields = fields.map((field, index) => {
        // _log(watchFieldArray[index])
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    const add = () => {
        const newLine = defVals.row
        append(newLine)
    }
    const groupId = _ID()

    const saveData: SubmitHandler<SillFormValues> = async (sill_group: SillFormValues) => {
        // console.log('sill_group', sill_group)
        const d = sill_group.row.map(r => ({ ...r, L: +r.L, B: +r.B }))
        const conv = d.map(v => new A_Sill(v.L, v.B, v.count))

        SillStore && SillStore.add(conv)
        console.log('store: ', ...toJS(SillStore?.store) || [])

    }


    const onSubmitFn: FormSubmitHandler<SillFormValues> = (payload) => {
        const { data } = payload
        handleSubmit((s) => saveData(s), e => _log(e.root?.message || "error!"))
        // saveData(data)
        reset()
    }
    return (
        <Form name='sf'
            // action='/sill'
            // method='post'
            id='sf'
            control={control}
            onSubmit={({ data, formDataJson }) => {
                saveData(data)
                reset()
                return formDataJson
            }}

        >

            <Divider>
                <Button variant='contained' onClick={add} sx={{ px: 1, mx: 1, }}>Add Row</Button>
            </Divider>
            {CFields.map((f, idx) =>
                <Stack flexDirection={'row'} key={f.id}
                    useFlexGap gap={1}
                    alignItems={'stretch'} p={1}
                >
                    <Avatar variant='square' sx={{ alignSelf: 'center' }}>{idx + 1}</Avatar>
                    <TextField sx={{ flexGrow: 0 }}
                        label="Длина"
                        placeholder={'L'}
                        {...register(`row.${idx}.L` as const, { required: true, shouldUnregister: true, valueAsNumber: true })}
                        variant='filled'
                        size='small'
                        helperText={errors ? errors?.root?.message : ""} />
                    <TextField sx={{ flexGrow: 0 }}
                        label="Ширина"
                        {...register(`row.${idx}.B` as const, { required: true, shouldUnregister: true, valueAsNumber: true })}
                        size='small'
                        variant='filled' />
                    <TextField sx={{ flexGrow: 0 }}
                        label="Кол-во"
                        {...register(`row.${idx}.count` as const, { required: true, shouldUnregister: true, valueAsNumber: true })}
                        size='small'
                        variant='filled' />

                    <Button disabled={idx < 1}
                        variant='contained' onClick={() => remove(idx)}>Delete</Button>

                </Stack>
            )}

            <Divider sx={{ fontFamily: 'Fira Code' }}>
                {/* <span>ControlledInputsForm </span> */}
                <Button type='submit' variant='outlined' sx={{ px: 1, mx: 1, }} form={'sf'}> Submit</Button>

            </Divider>
            {ViewConfig.visible.devtools && <DevTool control={control} />}
        </Form>
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

    redirect(`/sill/groups`)
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

//* submitFn
// ({ data, formDataJson, formData, method, event }) => {
//     // const { data, formDataJson, formData, method, event } = payload
//     // console.log('event', event)
//     // console.log('method: ', method)
//     // handleSubmit((data) => , (e) => _log("error!", e?.root?.message))
//     saveToStore(data)
//     console.log('formData', JSON.parse(formDataJson))
//     return data
//     // reset()
// }