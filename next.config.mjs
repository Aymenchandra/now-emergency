/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns :[
            {
                protocol : 'https',
                hostname : 'demo.tailadmin.com'
            }
        ]
    }
};

export default nextConfig;
