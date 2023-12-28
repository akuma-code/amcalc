// import { observer } from 'mobx-react-lite';
// import React, { useState } from 'react';
// import { A_Sill } from '../../../Interfaces/CommonTypes';
// import { Form as DomForm, Params, redirect, useActionData, useFetcher, useNavigation, useSubmit } from 'react-router-dom';
// import { ANYobj } from '../../../Interfaces/MathActionsTypes';
// import { _ID, _log } from '../../../Helpers/HelpersFns';
// import { Avatar, Box, Button, Divider, Stack, TextField, useFormControl } from '@mui/material';
// // import { useFieldSet } from '../../../Hooks/useFieldSet';
// import { Form as HookForm } from 'react-hook-form';

// type SillFormProps = {}

// type IData<T extends ANYobj = A_Sill> = {
//     id: string
//     data: T
// }

// type IDataGroup<T extends ANYobj> = {
//     id: string
//     group: IData<T>[]
// }

// type InputRowValues = {
//     id: string
//     L: string
//     B: string
//     count: string
// }
// type FormValuesGroup = {
//     grp_id: string
//     group: InputRowValues[]
// }

// type SillFormValues = {
//     group: InputRowValues[]
//     store: FormValuesGroup[]
// }

// type SillStore = {
//     sill: FormValuesGroup[]
// }

// const initFields = {
//     B: "",
//     L: "",
//     count: "",
// }

// export type FActionLoaderProps = { request: Request, params: Params }
// //__ action
// const form_action = async ({ request, params }: FActionLoaderProps) => {
//     const fd = await request.formData()
//     params && _log('params: ', params)
//     // console.log('fd', Object.fromEntries(fd.entries()))
//     const grp_id = _ID()
//     const groups = { grp_id, group: Object.fromEntries(fd) }

//     // const groups = { _groupId: groupId, grs:  }
//     console.log('groups(action): ', groups)

//     redirect(`/groups/${grp_id}`)
//     return groups
// }
// //__ loader
// const form_loader = async ({ request, params }: FActionLoaderProps) => {
//     const data = await request.formData()
//     const { gr_id } = params
//     _log("form: ", data)
//     _log("groupID: ", gr_id)
//     return Object.fromEntries(data)
// }


// //! FORM
// const SillForm: React.FC<SillFormProps> = observer(() => {

//     const [fields, control] = useFieldSet(initFields)
//     const [groups, setGroups] = useState<FormValuesGroup[]>([])


//     const SUB = useSubmit()
//     const submitFn = (e: React.FormEvent<HTMLFormElement>) => {

//         // e.preventDefault()
//         const fd = new FormData()
//         fd.append('grp:', JSON.stringify(groups, null, 2))
//         // const grp_id = _ID()
//         // const grp = { grp_id, group: fields }

//         // fd.append('f', JSON.stringify(grp))
//         // console.log('fd', Object.fromEntries(fd))
//         saveGroup()
//         SUB(fd)
//         // submit(fd)
//     }
//     const saveGroup = () => {
//         const f = new FormData()
//         const grp_id = _ID()
//         const grp = { grp_id, group: fields }
//         setGroups(prev => [...prev, grp])

//         return grp
//     }

//     const addInputsRow = async (e: React.FormEvent<HTMLFormElement>, inputRow: InputRowValues) => {

//         const rfd = new FormData()
//         const newRow = {}
//         rfd.append(inputRow.id, JSON.stringify(inputRow))
//         await fetch('/sill/groups', {
//             method: 'post',
//             body: rfd
//         })

//     }


//     return (
//         // <Box component={'form'} onSubmit={submitFn} action='/sill/groups' method='post' id='sf' name='sill_form'>


//         <DomForm name='sill-form' action='groups' method='post' id='sf' onSubmit={submitFn}

//         >
//             {fields.map((f, idx) =>

//                 <Stack flexDirection={'row'} key={f.id}
//                     useFlexGap gap={1}
//                     alignItems={'stretch'} p={1}
//                 >
//                     <Avatar variant='square' sx={{ alignSelf: 'center' }}>{idx + 1}</Avatar>
//                     <TextField sx={{ flexGrow: 0 }} name={`${idx}-L`}
//                         id={"LInput" + idx}
//                         label="Длина"
//                         defaultValue={f.L}
//                         // value={f.L || ""}
//                         // onChange={(e) => control.edit(f._id, 'L', e.target.value)}
//                         variant='filled'
//                         size='small' />
//                     <TextField sx={{ flexGrow: 0 }} name={`${idx}-B`}
//                         id={"BInput" + idx}
//                         label="Ширина"
//                         defaultValue={f.B}
//                         // value={f.B || ""}
//                         // onChange={(e) => control.edit(f._id, 'B', e.target.value)}
//                         size='small'
//                         variant='filled' />
//                     <TextField sx={{ flexGrow: 0 }} name={`${idx}-count`}
//                         id={"CountInput" + idx}
//                         label="Кол-во"
//                         defaultValue={f.count}
//                         // value={f.count || ""}
//                         // onChange={(e) => control.edit(f._id, 'count', e.target.value)}
//                         size='small'
//                         variant='filled' />
//                     <Button variant='contained' onClick={control.add}>Add</Button>
//                     <Button variant='contained' onClick={() => control.delete(f.id)}>Delete</Button>
//                 </Stack>

//             )}
//             <Divider>
//                 <Button type='submit' variant='outlined' sx={{ px: 1, mx: 1, }} form={'sf'}> Submit</Button>
//             </Divider>
//         </DomForm>
//         // </Box>
//     )


// })

// export default SillForm

// SillForm.displayName = '*** Sill Form'

// function InputRow(r: IData<A_Sill>, L: number, B: number, count: number) {
//     return <Stack flexDirection={'row'} key={r.id}
//         useFlexGap gap={1}
//         alignItems={'center'}
//     >
//         <TextField
//             id="LInput"
//             label="Длина"
//             value={L || ""}
//             // helperText="Длина"
//             variant='filled'
//             size='small' />
//         <TextField
//             id="BInput"
//             label="Ширина"
//             value={B || ""}
//             // helperText="Ширина"
//             size='small'
//             variant='filled' />
//         <TextField
//             id="CountInput"
//             label="Кол-во"
//             value={count || ""}
//             // helperText="Кол-во"
//             size='small'
//             variant='filled' />
//         <Button variant='contained'>Add</Button>
//         <Button variant='contained'>Delete</Button>
//     </Stack>;
// }


// //! submitfn
// // const submitFn = async (e: React.FormEvent<HTMLFormElement>) => {
// //         setGroups(prev => ([...prev, fields]))
// //         const fd = new FormData()
// //         // _log(JSON.stringify(fields, null, 2))
// //         console.log('added:', fields)
// //         const flds = JSON.stringify(fields)
// //         fd.append('grps', flds)
// //         submit(fd)
// //         // submit(e.currentTarget.form)
// //         return submit(fd)

// //     }