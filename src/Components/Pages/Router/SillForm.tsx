import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { A_Sill } from '../../../Interfaces/CommonTypes';
import { Form, useActionData, useSubmit } from 'react-router-dom';
import { ANYobj } from '../../../Interfaces/MathActionsTypes';
import { _ID, _log } from '../../../Helpers/HelpersFns';
import { Button, Stack, TextField } from '@mui/material';
import { useFieldSet } from '../../../Hooks/useFieldSet';

type SillFormProps = {}

type IData<T extends ANYobj = A_Sill> = {
    id: string
    data: T
}

type IDataGroup<T extends ANYobj> = {
    id: string
    group: IData<T>[]
}

type FormRowValues = {} & IData<A_Sill>

type FormValuesGroup = {
    id: string
    group: FormRowValues[]
}

type SillFormValues = {
    input_row: IData<A_Sill>
    groups: IDataGroup<A_Sill>
}

type SillStore = {
    sill: FormValuesGroup[]
}

const initFields = {
    B: "",
    L: "",
    count: "",


}



const SillForm: React.FC<SillFormProps> = observer(() => {

    const [fields, control] = useFieldSet(initFields)
    const [groups, setGroups] = useState<typeof fields[]>([])
    const action = useActionData()
    const submit = useSubmit()
    const submitFn = async (e: React.FormEvent<HTMLFormElement>) => {
        setGroups(prev => ([...prev, fields]))
        const fd = new FormData()
        // _log(JSON.stringify(fields, null, 2))
        console.log('added:', fields)
        const flds = JSON.stringify(groups)
        fd.append('grps', flds)
        console.log('action in Form:', action)
        // submit(e.currentTarget.form)
        return fd

    }
    return (
        <Form name='sill-form' method='post' action='groups'
            onSubmit={(e) => submitFn(e)}
        >
            {fields.map((f, idx) =>
                <Stack flexDirection={'row'} key={f._id}
                    useFlexGap gap={1}
                    alignItems={'stretch'} p={1}
                >
                    <TextField sx={{ flexGrow: 0 }} name={'L' + idx}
                        id={"LInput" + idx}
                        label="Длина"
                        value={f.L || ""}
                        onChange={(e) => control.edit(f._id, 'L', e.target.value)}
                        variant='filled'
                        size='small' />
                    <TextField sx={{ flexGrow: 0 }} name={'B' + idx}
                        id={"BInput" + idx}
                        label="Ширина"
                        value={f.B || ""}
                        onChange={(e) => control.edit(f._id, 'B', e.target.value)}
                        size='small'
                        variant='filled' />
                    <TextField sx={{ flexGrow: 0 }} name={'count' + idx}
                        id={"CountInput" + idx}
                        label="Кол-во"
                        value={f.count || ""}
                        onChange={(e) => control.edit(f._id, 'count', e.target.value)}
                        size='small'
                        variant='filled' />
                    <Button variant='contained' onClick={control.add}>Add</Button>
                    <Button variant='contained' onClick={() => control.delete(f._id)}>Delete</Button>
                </Stack>
            )}
            <Button type='submit' variant='outlined' sx={{ px: 1, mx: 1 }} > Submit</Button>

        </Form>
    )


})

export default SillForm

SillForm.displayName = '*** Sill Form'

function InputRow(r: IData<A_Sill>, L: number, B: number, count: number) {
    return <Stack flexDirection={'row'} key={r.id}
        useFlexGap gap={1}
        alignItems={'center'}
    >
        <TextField
            id="LInput"
            label="Длина"
            value={L || ""}
            // helperText="Длина"
            variant='filled'
            size='small' />
        <TextField
            id="BInput"
            label="Ширина"
            value={B || ""}
            // helperText="Ширина"
            size='small'
            variant='filled' />
        <TextField
            id="CountInput"
            label="Кол-во"
            value={count || ""}
            // helperText="Кол-во"
            size='small'
            variant='filled' />
        <Button variant='contained'>Add</Button>
        <Button variant='contained'>Delete</Button>
    </Stack>;
}
