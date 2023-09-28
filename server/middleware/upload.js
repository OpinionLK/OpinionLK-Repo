import multer from 'multer';

const storage = multer.memoryStorage(
    {
        destination: function (req, file, callback) {
            callback(null, '');
        }
    }
);
const upload = multer({ storage });

export default upload;
