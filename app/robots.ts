import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // 您的实际域名
    const baseUrl = 'https://love.teasytools.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
