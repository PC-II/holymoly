import { app } from "./config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);
const defaultProfilePicRef = ref(storage, 'default.png');

export const getDefaultProfilePic = async() => {
  try {
    return await getDownloadURL(defaultProfilePicRef);
  } catch(err){
    console.log(err);
  }
}