import { observer } from 'mobx-react-lite';
import React from 'react';
import { A_Sill } from '../../Interfaces/CommonTypes';

type SillFormProps = {}
type FormValues = {
    sill: A_Sill[]
}
const SillForm: React.FC<SillFormProps> = observer(() => {

    return <div>
        <form id="search-form" role="search">
            <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
            />
            <div
                id="search-spinner"
                aria-hidden
                hidden={true}
            />
            <div
                className="sr-only"
                aria-live="polite"
            ></div>
        </form>
        <form method="post">
            <button type="submit">New</button>
        </form>
    </div>


})

export default SillForm