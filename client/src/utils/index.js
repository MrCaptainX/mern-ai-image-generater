import axios from 'axios';
import FileSaver from 'file-saver';
export const instance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
};