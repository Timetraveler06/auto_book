const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
  },
};

// Log the config values to check if they are being loaded correctly
console.log("API Endpoint:", config.env.apiEndpoint);
console.log("ImageKit Public Key:", config.env.imagekit.publicKey);
console.log("ImageKit URL Endpoint:", config.env.imagekit.urlEndpoint);
console.log("ImageKit Private Key:", config.env.imagekit.privateKey ? "Loaded" : "Missing");

export default config;
