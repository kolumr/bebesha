export const uploadCreationImage = async (
    ) => {
        try {
            const b2 = new B2({
                applicationKeyId: process.env.backblazeb2ApplicationKeyId, 
                applicationKey: process.env.backblazeb2ApplicationKey, 
            });
    
            await b2.authorize(); // must authorize first (authorization lasts 24 hrs)
            console.log("I am here");
            let response = await b2.getBucket({
                bucketName: "bobbyhill",
            });
    
            var storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./uploads");
                },
                filename: function (req, file, cb) {
                    cb(null, file.originalname);
                },
            });
    
            const multerUploader = multer({});
            const upload = multerUploader.single("image");
            // console.log(JSON.stringify(multerUploader));
    
             upload(req, res, (err: any) => {
                if (err instanceof multer.MulterError) {
                    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
                    // A Multer error occurred when uploading.
                } else if (err) {
                    // An unknown error occurred when uploading.
                    return res.sendStatus(INTERNAL_SERVER_ERROR_STATUS);
                }
                // console.log("joe", req.file.buffer);
                // console.log("biden", req.file);
                b2.getUploadUrl({
                    bucketId: "58dd09e54842aafc7dcd0917",
                    // ...common arguments (optional)
                }).then((response) => {
                    console.log("getUploadUrl", response.data.uploadUrl , response.data.authorizationToken);
                    
                    b2.uploadFile({
                        uploadUrl: response.data.uploadUrl,
                        uploadAuthToken: response.data.authorizationToken,
                        fileName: "fileName",
                        contentLength: 0,
                        mime: "", /
                        data: req.file.buffer, 
                        hash: "sha1-hash", 
                        onUploadProgress: null,
             
                    }).then((response) => {
                        console.log('uploadFIle', response); 
                        return res.send({ path: req.file.originalname });
                    } 
                   
                    // Everything went fine and save document in DB here.
                });
            });
        } catch (err) {
            console.log("Error getting bucket:", err);
        }
    };