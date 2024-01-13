import React from 'react'

type PrintProps = {}

export const PrintPage: React.FC<PrintProps> = (props) => {



    return (

        <table className='flex flex-col border-2 max-w-fit'>
            <thead>
                <tr className='flex justify-between'>

                    <td>Size</td>
                    <td>Count</td>
                </tr>

            </thead>
            <tbody>

                <tr>
                    <td>1200*120</td>
                    <td>1</td>
                </tr>


                <tr>
                    <td>2.01 п.м. 13 шт</td>
                </tr>
            </tbody>
        </table>

    )
}

const Theader = () => {
    return <thead>

        <td>Size</td>
        <td>Count</td>

    </thead>
}