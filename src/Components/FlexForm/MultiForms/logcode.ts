import React from 'react'

// const MultiFormSelector_v2: React.FC<MultiFormProps> = observer(() => {
//     const { InputStore } = useStoresContext()
//     const inst = InputStore.inpType
//     const dto = useMemo(() => {
//         return dto_formdata[inst]
//     }, [inst])

//     const methods = useForm<IControlsFullSize>({
//         defaultValues: {
//             height: "",
//             width: "",
//         },
//         mode: 'onChange'
//     })


//     // useEffect(() => {
//     //     reset({ full_size: [] })
//     // }, [reset])
//     return (
//         <FormProvider {...methods}>
//             <Box
//                 component="form"
//                 sx={{
//                     '& .MuiTextField-root': { m: 1, width: '25ch' },
//                 }}
//                 // onSubmit={handleSubmit(() => InputStore.save('size_full', getValues() as unknown as ISizeFull))}
//                 autoComplete="on"
//                 id='fs_form'
//                 display={'flex'}
//                 flexDirection={'column'}
//                 height={'fit-content'}
//             >
//                 {'khlgjhgjgf'}

//                 {['width', 'height'].map((f, idx) => (
 
//                     <InputControl
//                         name={f as keyof ISizeFull}
//                         key={idx}
//                     // control={control}
//                     />
//                 ))}
//             </Box>
//             <Button type='submit'
//                 form='fs_form'
//                 variant='contained'
//                 color='success'

//             >
//                 SUBMIT
//             </Button>
//         </FormProvider>
//     )
// })
