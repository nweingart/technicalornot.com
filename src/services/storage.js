import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {storage } from '../firebase/config'

export async function uploadImage(file) {
  try {
    // Create a unique filename using timestamp and original name
    const filename = `${Date.now()}-${file.name}`
    const storageRef = ref(storage, `profile-images/${filename}`)
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    return downloadURL
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
} 