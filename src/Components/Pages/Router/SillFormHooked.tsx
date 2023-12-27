import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { A_Sill } from '../../../Interfaces/CommonTypes';
import { Form as DomForm, Params, redirect, useActionData, useFetcher, useNavigation, useSubmit } from 'react-router-dom';
import { ANYobj } from '../../../Interfaces/MathActionsTypes';
import { _ID, _log } from '../../../Helpers/HelpersFns';
import { Avatar, Box, Button, Divider, Stack, TextField, useFormControl } from '@mui/material';
import { TFValues, useControlledFieldSet, useFieldSet } from '../../../Hooks/useFieldSet';
import { Form as HookForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type SillFormProps = {}

// type InputRowValues = {

//     L: number
//     B: number
//     count: number
//     // id: string
// }
const initFields = {
    row: [{
        L: 0,
        B: 0,
        count: 1,


    }],
    _name: 'row' as const
}
const IF = {
    B: 0,
    L: 0,
    count: 1,
}

// type TFV = TFValues<InputRowValues>
export type FActionLoaderProps = { request: Request, params: Params }
type cfn = `row.${number}.${string}`
const t = [{ n: '123' }].reduce((p, current) => {
    return p
}, 0)
//! Hook FORM                                                 
export const SillFormHooked: React.FC<SillFormProps> = observer(() => {
    const fan = 'row'
    const [CFields, handle] = useControlledFieldSet<'sill'>(initFields)
    console.log('CFields', CFields)
    const { register, append, remove } = handle
    // const names = Object.entries(CFields).reduce((sum, [k, v], idx) => {
    //     // const [k, v] = field
    //     const n: cfn = `${fan}.${idx}.${k}` as const
    //     sum.push(n)
    //     return sum
    // }, [] as cfn[])
    const names2 = (idx: number) => [
        `row.${idx}.L` as const,
        `row.${idx}.B` as const,
        `row.${idx}.count` as const,
    ]

    return (
        <DomForm name='sill-form' action='groups' method='post' id='sf'        >



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
                        {...register(names2(idx)[0], { required: true, shouldUnregister: true, valueAsNumber: true })}
                        variant='filled'
                        size='small' />
                    <TextField sx={{ flexGrow: 0 }}
                        // id={"BInput" + idx}
                        label="Ширина"
                        {...register(names2(idx)[1], { required: true, shouldUnregister: true, valueAsNumber: true })}
                        size='small'
                        variant='filled' />
                    <TextField sx={{ flexGrow: 0 }}
                        // id={"CountInput" + idx}
                        label="Кол-во"
                        {...register(names2(idx)[2], { required: true, shouldUnregister: true, valueAsNumber: true })}
                        size='small'
                        variant='filled' />
                    <Button variant='contained' onClick={() => append({ L: 0, B: 0, count: 1 },)}>Add</Button>
                    <Button variant='contained' onClick={() => remove(idx)}>Delete</Button>

                </Stack>
            )}

            <Divider>
                <span>ControlledInputsForm =&gt; </span> <Button type='submit' variant='outlined' sx={{ px: 1, mx: 1, }} form={'sf'}> Submit</Button>
            </Divider>
            <DevTool control={handle.control} />
        </DomForm>
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
    const groups = { grp_id, group: Object.fromEntries(fd) }

    // const groups = { _groupId: groupId, grs:  }
    console.log('groups(action): ', groups)

    redirect(`/groups/${grp_id}`)
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
