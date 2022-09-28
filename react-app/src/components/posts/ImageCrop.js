import React from "react";
import "./imagecrop.css";
import { nanoid } from "nanoid";

import Cropper from "react-easy-crop";

import getCroppedImg from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataUrlToFile";

export default function ImageCrop({ dataurl }) {

    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const submitCrop = async () => {
        const canvas = await getCroppedImg(dataurl, croppedArea)
        const canvasDataUrl = canvas.toDataURL('image/jpeg')
        const converted = dataURLtoFile(canvasDataUrl, `${nanoid()}.jpeg`)
        console.log(converted)
    }

    return (
        <div style={{ height: '600px', width: '800px' }} className='container'>
            <div className='container-cropper'>
                {dataurl ? (
                    <>
                        {/* <img src={image}></img> */}
                        <div className='cropper'>
                            <Cropper
                                image={dataurl}
                                // cropSize={{ width: 600, height: 600 }}
                                crop={crop}
                                zoom={1}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                    </>
                ) : null}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={submitCrop}>Hello</button>
            </div>
        </div>
    );
}
