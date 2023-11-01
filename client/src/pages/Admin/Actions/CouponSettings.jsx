import { 
    Card,
    CardHeader,
    Divider,
    Heading,
    CardBody,
    HStack,
    Input,
    Text,
    VStack,
 } from '@chakra-ui/react';

const CouponSettings = () => {
    return (
        <>
        <Card borderRadius={'20px'} width={'100%'}>
            <CardHeader>
                <Heading size={'md'}>Coupon Settings</Heading>
            </CardHeader>
            <Divider color={'gray.300'}/>
            <CardBody>
                <VStack gap={2}>
                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                    <Text>Points </Text>
                    <Input w={'50%'} type="number" placeholder="Enter Survey Base Cost" />
                </HStack>
                {/*Cost per Response*/}
                <HStack w={'100%'} display={'flex'} justifyContent={'space-between'}>
                    <Text>Cost Per Response </Text>
                    <Input w={'50%'} type="number" placeholder="Enter Survey Cost per Response" />
                </HStack>
                </VStack>
            </CardBody>
        </Card>
        </>
    );
    }

export default CouponSettings;