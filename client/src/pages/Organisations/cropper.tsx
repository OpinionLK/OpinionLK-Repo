import React, { useState, useRef } from 'react'

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
    convertToPixelCrop,
} from 'react-image-crop'
// import { canvasPreview } from './canvasPreview'
// import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import axios from 'axios'
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function App({loadImage}) {
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(21 / 9)

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
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

            canvas.toBlob(async (blob) => {
                if (!blob) return;

                const formData = new FormData();
                formData.append('image', blob, 'croppedImage.png');

                try {
                    const response = await axios.post('http://localhost:3002/api/survey/imageUpload/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })


                    if (response.status === 200) {
                        console.log(response.data)
                        loadImage(response.data.imageName)
                    } else {
                        // Handle error
                    }
                } catch (error) {
                    // Handle error
                }
            }, 'image/png');
        }
    }


    //   function onDownloadCropClick() {
    //     if (!previewCanvasRef.current) {
    //       throw new Error('Crop canvas does not exist')
    //     }

    //     previewCanvasRef.current.toBlob((blob) => {
    //       if (!blob) {
    //         throw new Error('Failed to create blob')
    //       }
    //       if (blobUrlRef.current) {
    //         URL.revokeObjectURL(blobUrlRef.current)
    //       }
    //       blobUrlRef.current = URL.createObjectURL(blob)
    //       hiddenAnchorRef.current!.href = blobUrlRef.current
    //       hiddenAnchorRef.current!.click()
    //     })
    //   }

    //   useDebounceEffect(
    //     async () => {
    //       if (
    //         completedCrop?.width &&
    //         completedCrop?.height &&
    //         imgRef.current &&
    //         previewCanvasRef.current
    //       ) {
    //         // We use canvasPreview as it's much faster than imgPreview.
    //         canvasPreview(
    //           imgRef.current,
    //           previewCanvasRef.current,
    //           completedCrop,
    //           scale,
    //           rotate,
    //         )
    //       }
    //     },
    //     100,
    //     [completedCrop, scale, rotate],
    //   )

    //   function handleToggleAspectClick() {
    //     if (aspect) {
    //       setAspect(undefined)
    //     } else if (imgRef.current) {
    //       const { width, height } = imgRef.current
    //       setAspect(16 / 9)
    //       const newCrop = centerAspectCrop(width, height, 16 / 9)
    //       setCrop(newCrop)
    //       // Updates the preview
    //       setCompletedCrop(convertToPixelCrop(newCrop, width, height))
    //     }
    //   }

    return (
        <div className="App">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                <div>
                    <label htmlFor="scale-input">Scale: </label>
                    <input
                        id="scale-input"
                        type="number"
                        step="0.1"
                        value={scale}
                        disabled={!imgSrc}
                        onChange={(e) => setScale(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label htmlFor="rotate-input">Rotate: </label>
                    <input
                        id="rotate-input"
                        type="number"
                        value={rotate}
                        disabled={!imgSrc}
                        onChange={(e) =>
                            setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                        }
                    />
                </div>
                <div>
                    <button onClick={sendCroppedImageToBackend}>
download
          </button>
                </div>
            </div>
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
                        style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}

        </div>
    )
}
