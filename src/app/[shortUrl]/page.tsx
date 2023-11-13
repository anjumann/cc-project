"use client"

import { redirect } from 'next/navigation'

const page = async ({ params }: { params: { shortUrl: string } }) => {

    if (params.shortUrl) {
        let headersList = {
            "Accept": "*/*",
        }
        let response = await fetch(process.env.URL + "/shorturl?code=" + params.shortUrl, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json() as {
            shortLink: {
                id: number,
                original: string,
                shorten: string,
                createdAt: Date,
                updatedAt: Date
                userId?: object
            }
        }
        // console.log(data.shortLink.original);
        let originalLink;

        if (data !== null && data.shortLink !== null && data.shortLink !== undefined) {
            originalLink = data.shortLink.original;
        }

        if (originalLink) {
            redirect(originalLink)
        }
    }
    return (
        <>

        </>
    )
}

export default page