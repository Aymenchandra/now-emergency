"use server"
import { getUserById } from '@/data/user';
import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary'

const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})


export const upload = async (formData : FormData) => {

  const user = await CurrentUser();

  if (!user) {
      return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id as string)

  if (!dbUser) {
      return { error: "Unauthorized" }
  }

  // upload image
  const file = formData.get("profile") as File

    if (!file || file?.size === 0) {
      return { error: "No file uploaded" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer)

    const res : any = await new Promise((resolve,reject) => {
      cloudinary.uploader.upload_stream(function(error,result){
        if(error){
          reject(error);
          return { error : "Error Uploading Image"}
        }
        resolve(result)
      }).end(buffer)
    }) 

    if(!res) {
      return { error : 'Something went wrong ! Try again'}
    }
    
    await db.user.update({
        where: { id: dbUser.id },
        data: {
            image : res.secure_url
        }
    })

    return { success: "Image Updated!" }
}