import multer from 'multer';
import path from 'path';

const upload = multer({
    dest: path.join('uploads'),
});

export default upload;
