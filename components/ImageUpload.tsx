"use client"
import ImageKit from "imagekit";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";

const { env: { imagekit: { publicKey , privateKey, urlEndpoint },},} = config;

const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
}); 


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

    const ikUploadRef = useRef(null)

  return 
  <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator} >

    <IKUpload />

</ImageKitProvider>

}

export default ImageUpload