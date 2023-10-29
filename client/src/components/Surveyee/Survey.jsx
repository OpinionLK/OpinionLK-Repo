//multipage implementation
import FormInputs from './FormInputs'
import useFormContext from "../../hooks/useFormContext"
import { Text,Box,Button,Flex,IconButton,} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

const Survey = () => {
    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide
    } = useFormContext()

    const handlePrev = () => setPage(prev => prev - 1)

    const handleNext = () => setPage(prev => prev + 1)

    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(data))
    }
    
    const content = (
        <form className="form flex-col" onSubmit={handleSubmit}>

            <header className="form-header">
                <h2>{title[page]}</h2>
            </header>
            {/* <FormInputs /> */}

            <Box
                size='md'
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='elevated'
                p='5'
                borderRadius='20'
                // width='253px'
                // align='center'
                bgColor='white'
            >
                <Flex align='center' mb='10'>
                    <IconButton variant='unstyled' aria-label='Back' icon={<ChevronLeftIcon />} color='#6C63FF' />
                    <Text fontSize={'xs'} color={'#A3AED0'} pl='3'>
                        Question {title[page]} of 10
                    </Text>
                </Flex>
                <FormInputs />
                <Button mt='5' colorScheme='purple' borderRadius='100px' bg='#6C63FF' w='100px'>Next</Button>
                <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>

                <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>

                <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button>
            </Box>
        </form>
    )

    // const content = (
    //     <form className="form flex-col" onSubmit={handleSubmit}>

    //         <header className="form-header">
    //             <h2>{title[page]}</h2>

    //             <div className="button-container">

    //                 <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>

    //                 <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>

    //                 <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button>
    //             </div>
    //         </header>


    //         <FormInputs />

    //     </form>
    // )

    return content
}
export default Survey