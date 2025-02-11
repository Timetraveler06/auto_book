import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey: config.env.imagekit.publicKey,
    privateKey: config.env.imagekit.privateKey,
    urlEndpoint: config.env.imagekit.urlEndpoint,
});