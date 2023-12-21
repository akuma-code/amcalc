import React, { BaseSyntheticEvent, SyntheticEvent } from 'react'
import { useForm, useFieldArray, useWatch, Control, Form, SubmitHandler } from "react-hook-form";
import { _ID } from '../../Helpers/HelpersFns';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { A_Sill, _ArgsMaker } from '../../Interfaces/CommonTypes';
import { Button, Input } from '@mui/material';

type SillFormProps = {}
type FormValues = {
    sill: A_Sill[]
}
const SillForm = (props: SillFormProps) => {
    const { SillStore } = useStoresContext()
    const {
        register, control, handleSubmit, formState: { errors }, reset
    } = useForm<FormValues, FormValues>({
        defaultValues: {
            sill: [{ L: 1100, B: 180, count: 1 }]
        }
    })

    const { fields, append, remove } = useFieldArray({ name: 'sill', control: control })
    const onSubmitFn: SubmitHandler<FormValues> = (payload) => {

        payload.sill.forEach(a => {
            SillStore && SillStore.add(a)
        });
        console.log('FormValues: ', payload)
        control._reset()
        return payload
    }
    return (
        <Form control={control}
            onSubmit={({ data }) => onSubmitFn(data)}>
            {
                fields.map((f, idx) =>
                    <div key={f.id} className='flex flex-col w-fit bg-yellow-200'>
                        <Input {...register(`sill.${idx}.L` as const, { required: true, shouldUnregister: true })} name='L' placeholder='L' />
                        <Input {...register(`sill.${idx}.B` as const, { required: true, shouldUnregister: true })} name='B' placeholder='B' />
                        <Input {...register(`sill.${idx}.count` as const, { required: true, shouldUnregister: true })} name='count' placeholder='counter' />
                    </div>
                )
            }
            <Button type='submit' variant='contained' color='error'>Submit</Button>
        </Form>
    )
}

export default SillForm