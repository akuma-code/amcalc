import { observer } from 'mobx-react-lite';
import React from 'react';
import { A_Sill } from '../../Interfaces/CommonTypes';
import { Form } from 'react-router-dom';

type SillFormProps = {}

type FormRowValues = {
    _id: string
} & A_Sill

type FormValuesGroup = {
    _id: string
    group: FormRowValues[]
}

type SillStore = {
    sill: FormValuesGroup[]
}

const SillForm: React.FC<SillFormProps> = observer(() => {

    return (
        <Form>

        </Form>
    )


})

export default SillForm