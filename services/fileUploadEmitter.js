import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

class FileUploadEmitter extends EventEmitter { };
const fileUploadEmitter = new FileUploadEmitter();

const logFilePath = path.join('logs', 'filesUpload.log');

const logEvent = (message) => {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const logMessage = `${timestamp} - ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

fileUploadEmitter.on('fileUploadStart', () => {
    logEvent('File upload has started');
});

fileUploadEmitter.on('fileUploadEnd', () => {
    logEvent('File has been uploaded');
});

fileUploadEmitter.on('fileUploadFailed', (error) => {
    logEvent(`Error occurred, file upload failed; Details: ${error.message}`);
});

export default fileUploadEmitter;