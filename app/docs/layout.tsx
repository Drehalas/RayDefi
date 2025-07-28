import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation - RayDefi',
  description: 'Complete API documentation for the RayDefi DeFi platform including Swagger/OpenAPI specification, examples, and SDK usage guides.',
  keywords: ['RayDefi', 'API', 'DeFi', 'Documentation', 'Swagger', 'OpenAPI', 'Cryptocurrency', 'Trading'],
  authors: [{ name: 'RayDefi Team' }],
  openGraph: {
    title: 'RayDefi API Documentation',
    description: 'Complete API documentation for the RayDefi DeFi platform',
    type: 'website',
    siteName: 'RayDefi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RayDefi API Documentation',
    description: 'Complete API documentation for the RayDefi DeFi platform',
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 