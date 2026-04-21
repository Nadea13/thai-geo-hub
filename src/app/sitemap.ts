import { MetadataRoute } from 'next';
import geoData from '@/data/geo-data.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thai-geo-hub.vercel.app';

  // Home page
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];

  // Province pages
  const provinces = Array.from(new Set(geoData.map((item: any) => item.province)));
  provinces.forEach((province) => {
    routes.push({
      url: `${baseUrl}/p/${encodeURIComponent(province)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    });
  });

  // Subdistrict pages (Deep SEO targets)
  geoData.forEach((item: any) => {
    routes.push({
      url: `${baseUrl}/p/${encodeURIComponent(item.province)}/${encodeURIComponent(item.district)}/${encodeURIComponent(item.subdistrict)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    });
  });

  return routes;
}
