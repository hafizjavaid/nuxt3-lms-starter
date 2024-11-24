
import cloudinary from 'cloudinary'
import Stripe from 'stripe'

export const deleteResourceFromCloudinary = async (url: string, isVideo: boolean = false) => {

    cloudinary.v2.config({
        api_key: useRuntimeConfig().cloudinaryApiKey,
        api_secret: useRuntimeConfig().cloudinaryApiSecret,
        cloud_name: useRuntimeConfig().public.cloudinaryCloudName,
    })
    const name = url.split('.')[url.split('.').length - 2].split('/').pop()

    if (name) {
        await cloudinary.v2.uploader.destroy(name, {
            resource_type: isVideo ? 'video' : 'image'
        })
    }

}


export const stripe = new Stripe(useRuntimeConfig().stripeSecret, {
    apiVersion: '2023-10-16',
    typescript: true
})