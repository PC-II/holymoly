import { storage } from "./config";
import { ref, getDownloadURL, connectStorageEmulator, listAll, getMetadata } from "firebase/storage";

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

export const generateMyPosts = async (uid) => {
  const videosRef = ref(storage, `users/${uid}/videos`);
  const imagesRef = ref(storage, `users/${uid}/images`);

  const allVideoFiles = (await listAll(videosRef)).items;
  const allImageFiles = (await listAll(imagesRef)).items;
  const allFiles = allVideoFiles.concat(allImageFiles);

  for(let i = 0; i < allFiles.length; i++){
    allFiles[i] = await getMetadata(allFiles[i]);
  }

  allFiles.sort(function(a, b){
    let x = a.timeCreated.toLowerCase();
    let y = b.timeCreated.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  }).reverse();

  allFiles.forEach(file => {
    // if(file.contentType.contains('image')){
    //   const imgPost = document.createElement('img');
    //   imgPost.setAttribute('src', )
    // }

    // THIS NEEDS URLDOWNLOAD TO WORK

    console.log(file);
  });

}