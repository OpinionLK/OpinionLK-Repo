import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Card,
  CardBody,
  Image,
  StarIcon,
  Text,
  Heading
} from '@chakra-ui/react';

import surveyIcon from '../../images/ic-1.png';

function StatViewCard() {
  return (
    <>


<Card
            size='md'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='elevated'
            p={[2, 2]}
            borderRadius='20'
            width='200px'
            align='center'
        >
            <Image
                top='50%'
                boxSize='60px'
                borderRadius='full'
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={surveyIcon}
                alt='totalSurveys'
                ml='3'
            />

            
            <CardBody>
                <Text fontSize={'xs'} color={'#A3AED0'}>
                    Total Surveys
                </Text>
                <Heading size='md' color={'#2B3674'}>224</Heading>
            </CardBody>
        </Card>


    </>
  );
}
export default StatViewCard;
