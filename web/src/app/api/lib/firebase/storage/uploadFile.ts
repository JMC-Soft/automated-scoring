import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@firebase/storage';
import firebaseApp from '@/lib/firebase/config';

const storage = getStorage(firebaseApp);

export default async function uploadFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `files/primitive/${file.name}`;
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, buffer);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // 이미지 업로드가 얼마나 진행됐는지 알려주는 상태
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // https://firebase.google.com/docs/storage/web/handle-errors
        const returnObj = { error: error.code, message: error.message };
        reject(returnObj);
      },
      async () => {
        // 업로드가 성공하면 업로드 주소를 가져오고, 그 주소를 resolve 로 반환
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const returnObj = { url };
        resolve(returnObj);
      },
    );
  });
}
