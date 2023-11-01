import { useParams, useNavigate  } from 'react-router-dom';
import TopbarAnon from '../components/Layout/TopbarAnon';
import { Button, Text, Heading, Flex, Image } from '@chakra-ui/react'
import complete from '../images/complete.png'

// Your component
// eslint-disable-next-line
export default function SurveyComplete() {
    const { points } = useParams();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const responseID = searchParams.get('responseID');
    const surveyID = searchParams.get('surveyID');
// eslint-disable-next-line
    const desc = "Thank you for completing the survey, we value your responses!\nIf you were a registered user, you would have earned {points} points for simply filling this survey./nSurvey points can be redeemed to use at our partner stores here in Sri Lanka./nsome partner store logos/nSign up today and add these points to your account!"
    return (
        <>
            <TopbarAnon />
            <Flex
                direction='column'
                alignItems='center'
                justifyContent='center'
                height='100%'
                mt='200'
                bgColor='#f5f7fe'
            >
                <Heading color='#1B2559'>
                    Survey Complete!
                </Heading>
                <Text m='3' mb='6' color='#1B2559'>
                    We value your opinion.
                </Text>
                <Image m='3' src={complete}/>
                <Text mt='3' color='#A3AED0'>
                    If you were a registered user, you would have earned {points} points for filling this survey.
                </Text>
                <Text color='#A3AED0'>
                    Survey points can be redeemed for coupons to use at our partner stores here in Sri Lanka.
                </Text>
                <Text color='#A3AED0'>
                    Sign up today and add these points to your new account!
                </Text>
                {/* <Text m='3' color='#A3AED0' w='690px'>
                    If you were a registered user, you would have earned {points} points for simply filling this survey.
                    Survey points can be redeemed to use at our partner stores here in Sri Lanka.
                    //some partner store logos
                    Sign up today and add these points to your account!
                </Text> */}
                <Button 
                    m='5' 
                    colorScheme='purple' 
                    borderRadius='30px' 
                    bg='#6C63FF' 
                    // w='100px'
                    h='70'
                    onClick={() => navigate(`/signup?responseID=${responseID}&surveyID=${surveyID}`)}
                >Sign Up and Earn Points!</Button>
            </Flex>
        </>
    );
}
