import ImageKit from "imagekit";

const {env: { imagekit: { publicKey,privateKey,urlEndpoint}}} = config;

const imagekit = new ImageKit({
    publicKey: publicKey,
    privateKey: privateKey,
    urlEndpoint: urlEndpoint,
});