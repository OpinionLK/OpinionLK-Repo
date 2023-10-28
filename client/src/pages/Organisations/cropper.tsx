import React, { useState, useRef, useMemo } from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'

import {
    Button,
    Flex,
    ModalCloseButton,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    Modal,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'

import { useDropzone } from 'react-dropzone';

import 'react-image-crop/dist/ReactCrop.css'
import axios from 'axios'

const baseStyle = {
    flex: 1,
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    height: '200px',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 100,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function App({ loadImage, surveyId }) {
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    // eslint-disable-next-line
    const [aspect, setAspect] = useState<number | undefined>(21 / 9)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e[0])
            setShowCropper(true)
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }


    async function sendCroppedImageToBackend() {
        if (!completedCrop || !imgRef.current) return;

        const canvas = document.createElement('canvas');
        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width!;
        canvas.height = completedCrop.height!;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(
                image,
                completedCrop.x! * scaleX,
                completedCrop.y! * scaleY,
                completedCrop.width! * scaleX,
                completedCrop.height! * scaleY,
                0,
                0,
                completedCrop.width!,
                completedCrop.height!
            );

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            canvas.toBlob(async (blob) => {
                if (!blob) return;

                const formData = new FormData();
                formData.append('image', blob, 'croppedImage.jpg');
// add survey id to the request

                setIsLoading(true)
                try {
                    const response = await axios.post('http://localhost:3002/api/survey/'+surveyId+'/imageUpload/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }
                    )


                    if (response.status === 200) {
                        console.log(response.data)
                        loadImage(response.data.surveyImage)
                        resetFile()
                        onClose()
                        setIsLoading(false)
                    } else {
                        // Handle error
                    }
                } catch (error) {
                    // Handle error
                }
            }, 'image/jpeg', 1);
        }
    }

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles)
        onSelectFile(acceptedFiles)
        console.log('File dropped!');
    };

    const [isLoading, setIsLoading] = useState(false)
    const resetFile = () => {
        setImgSrc('')
        setShowCropper(false)
    };
    const { getRootProps, getInputProps, isFocused,
        isDragAccept,
        isDragReject } = useDropzone({ onDrop });
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showCropper, setShowCropper] = useState(false)

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className="App">
            <Button onClick={onOpen}>Upload Image</Button>
            <Modal size={'xl'} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody minHeight={'50vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'}
                        alignItems={'center'}>
                        {
                            !showCropper ? <Flex flexDirection={'column'}>
                                <div className="Crop-Controls">
                                    <div {...getRootProps({ style })}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>


                                </div>
                            </Flex>
                                : null
                        }

                        {!!imgSrc && (
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        )}

                    </ModalBody>
                    {
                        showCropper ? <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={resetFile}>
                                Delete
                            </Button>
                            <Button isLoading={isLoading} colorScheme='blue' onClick={sendCroppedImageToBackend}>Set Image</Button>
                        </ModalFooter> : null
                    }

                </ModalContent>
            </Modal>

        </div>

    )
}
