import React, { BaseSyntheticEvent, SyntheticEvent } from 'react'
import { useForm, useFieldArray, useWatch, Control, Form as HForm, SubmitHandler } from "react-hook-form";
import { _ID } from '../../Helpers/HelpersFns';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { A_Sill, _ArgsMaker } from '../../Interfaces/CommonTypes';
import { Button, Input } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { spawn } from 'child_process';
import { DevTool } from '@hookform/devtools';
import { Form } from 'react-router-dom';

type SillFormProps = {}
type FormValues = {
    sill: A_Sill[]
}
const SillForm: React.FC<SillFormProps> = observer(() => {
    const { SillStore, ViewConfig } = useStoresContext()
    const {
        register, control, handleSubmit, formState: { errors, }, reset
    } = useForm<FormValues>({
        defaultValues: {
            sill: []
        }
    })

    const { fields, append, remove, } = useFieldArray({ name: 'sill', control: control })
    const onSubmitFn: SubmitHandler<FormValues> = (data, e) => {

        data.sill.forEach(a => {
            SillStore && SillStore.add(a)

        });
        console.log('FormValues: ', data.sill)
        // reset()
        // return payload
    }
    return (
        <HForm id={'sill_form'}
        // onSubmit={({data})=>onSubmitFn(data)}
        >
            {
                fields.map((f, idx) =>
                    <div key={f.id} className='flex flex-col w-fit bg-yellow-200'>
                        <Input {...register(`sill.${idx}.L` as const, { required: true, })} name='L' placeholder='L' />
                        <Input {...register(`sill.${idx}.B` as const,)} name='B' placeholder='B' />
                        <Input {...register(`sill.${idx}.count` as const,)} name='count' placeholder='counter' />
                    </div>
                )
            }
            <Button type='submit'
                form='sill_form'
                variant='contained'
                color='success'
                sx={{ margin: 1 }}
            >
                SUBMIT
            </Button>
            {<DevTool control={control} />}
        </HForm>
    )
})

export default SillForm