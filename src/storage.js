import { app } from "./config";
import { getStorage, ref, getDownloadURL, connectStorageEmulator } from "firebase/storage";

const storage = getStorage();
connectStorageEmulator(storage, "localhost", 9199);

/* Get Default Profile Picture */
const defaultProfilePicRef = ref(storage, 'default.png');
export const getDefaultProfilePic = async() => {
  try {
    return getDownloadURL(defaultProfilePicRef);
  } catch(err){
    console.log(err);
  }
}