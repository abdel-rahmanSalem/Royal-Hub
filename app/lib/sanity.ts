import imageUrlBuilder from '@sanity/image-url'
import { createClient } from "next-sanity";

export const client = createClient({
    projectId: 'qsbs10y6',
    dataset: 'production',
    apiVersion: '2024-05-02',
    useCdn: true    
})

const builder = imageUrlBuilder(client);

export function urlFor(source: any){
    return builder.image(source);
}