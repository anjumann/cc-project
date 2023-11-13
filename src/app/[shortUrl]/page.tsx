"use client"

import { redirect } from 'next/navigation'

const page = ({ params }: { params: { shortUrl: string } }) => {

    const redirectFunction = async () => {
        try {
            if (params.shortUrl) {
                let headersList = {
                    "Accept": "*/*",
                };

                let response = await fetch(process.env.NEXT_PUBLIC_URL + "/shorturl?code=" + params.shortUrl, {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json() as {
                    shortLink: {
                        id: number,
                        original: string,
                        shorten: string,
                        createdAt: Date,
                        updatedAt: Date,
                        userId?: object
                    }
                };

                let originalLink;

                if (data?.shortLink) {
                    originalLink = data.shortLink.original;
                }

                if (originalLink) {
                    window.location.replace(originalLink);
                }
            }
        } catch (error) {
            console.log(error);
            // Consider adding more robust error handling here
        }
    };

    redirectFunction();



    return null;
}

export default page