"use client"
import config from "@/lib/config";
import ImageKit from "imagekit";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";


const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;



const authenticator = async()=>{
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth.imagekit`);

        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Request failed with status:  ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const {signature, expire, token} = data;

        return { token , expire , signature};
        
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
        
    }

}
const ImageUpload = () => {

    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string} | null >(null);

    const onError = () =>{};
    const onSuccess  = () =>{};

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator} >

        <IKUpload 
            className="hidden" ref={ikUploadRef} onError={onError} onSuccess={onSuccess} fileName="test-upload.png" />
            <button className="upload-btn">Hi</button>
    </ImageKitProvider>
  )

}

export default ImageUpload