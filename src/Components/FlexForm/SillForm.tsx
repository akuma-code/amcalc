import React, { BaseSyntheticEvent, SyntheticEvent } from 'react'
import { useForm, useFieldArray, useWatch, Control, Form, SubmitHandler } from "react-hook-form";
import { _ID } from '../../Helpers/HelpersFns';
import { useStoresContext } from '../../Hooks/useStoresContext';
import { A_Sill, _ArgsMaker } from '../../Interfaces/CommonTypes';
import { Button, Input } from '@mui/material';
import { observer } from 'mobx-react-lite';

type SillFormProps = {}
type FormValues = {
    sill: A_Sill[]
}
const SillForm: React.FC<SillFormProps> = observer(() => {
    const { SillStore } = useStoresContext()
    const {
        register, control, handleSubmit, formState: { errors }, reset
    } = useForm<FormValues, FormValues>({
        defaultValues: {
            sill: [{ count: 1 }]
        }
    })

    const { fields, append, remove } = useFieldArray({ name: 'sill', control: control })
    const onSubmitFn: SubmitHandler<FormValues> = (payload) => {

        payload.sill.map(a => {
            SillStore && SillStore.add(a)
            return a
        });
        console.log('FormValues: ', payload)
        reset()
        // return payload
    }
    return (
        <Form control={control} name='sill_form' id={'sill_form'}
            onSubmit={({ data }) => onSubmitFn(data)}>
            {
                fields.map((f, idx) =>
                    <div key={f.id} className='flex flex-col w-fit bg-yellow-200'>
                        <Input type='number'{...register(`sill.${idx}.L` as const, { required: true, shouldUnregister: true, })} name='L' placeholder='L' />
                        <Input type='number'{...register(`sill.${idx}.B` as const, { required: true, shouldUnregister: true, })} name='B' placeholder='B' />
                        <Input type='number'{...register(`sill.${idx}.count` as const, { required: true, shouldUnregister: true, })} name='count' placeholder='counter' />
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
        </Form>
    )
})

export default SillForm