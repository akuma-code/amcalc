import React from 'react'
import { useForm } from 'react-hook-form'
import InputNumber from '../UI/InputNumber'

type FormProps = {
    W: number
    H: number
    h: number
    da: number
    db: number
}
type FlexFormProps = {

}
const FlexForm: React.FC<FlexFormProps> = () => {

    const { register, handleSubmit } = useForm<FormProps>()


    return (
        <div>
            <form >
                <input {...register('H')} />
            </form>
        </div>
    )
}