import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#00ff9f',
};

export const metadata: Metadata = {
  title: 'Arunod Manohara — Web Developer & Cybersecurity',
  description: 'Arunod Manohara (arunodmanoharaofficial) — Web Developer and Cybersecurity Student at SLIIT University, Sri Lanka. Expert in Python, Java, Docker, WireGuard VPN tunneling, and secure network automation. Open for freelance work.',
  keywords: [
    'Arunod Manohara', 'Arunod', 'arunodmanoharaofficial', 'web developer Sri Lanka', 'cybersecurity student', 
    'SLIIT University', 'Python developer', 'Docker', 'WireGuard', 'VPN tunneling', 'network security', 
    'ethical hacking', 'cybersecurity portfolio', 'freelance developer', 'secure automation', 'Java developer'
  ],
  authors: [{ name: 'Arunod Manohara' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  applicationName: 'Arunod Manohara Portfolio',
  alternates: {
    canonical: 'https://www.arunod.us/',
    languages: {
      en: 'https://www.arunod.us/',
    },
  },
  openGraph: {
    type: 'profile',
    url: 'https://www.arunod.us/',
    title: 'Arunod Manohara | Web Developer & Cybersecurity Student',
    description: 'Arunod Manohara (arunodmanoharaofficial) — Web Developer and Cybersecurity Student at SLIIT University, Sri Lanka. Building secure systems, VPN servers, and exploring ethical hacking.',
    siteName: 'Arunod Manohara',
    images: [{
      url: 'https://www.arunod.us/profile.jpg',
      width: 400,
      height: 400,
      alt: 'Arunod Manohara — Web Developer & Cybersecurity Student'
    }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@arunodmanohara',
    creator: '@arunodmanohara',
    title: 'Arunod Manohara | Web Developer & Cybersecurity Student',
    description: 'Arunod Manohara (arunodmanoharaofficial) — Web Developer and Cybersecurity Student at SLIIT University. Open for freelance.',
    images: ['https://www.arunod.us/profile.jpg'],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Arunod Manohara',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="English" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://www.arunod.us/#person",
                  "name": "Arunod Manohara",
                  "alternateName": ["Arunod", "arunodmanoharaofficial"],
                  "givenName": "Arunod",
                  "familyName": "Manohara",
                  "description": "Web Developer and Cybersecurity Student at SLIIT University, Sri Lanka. Specializes in Python, Java, Docker, WireGuard VPN tunneling, and secure network automation.",
                  "url": "https://www.arunod.us/",
                  "mainEntityOfPage": "https://www.arunod.us/",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://www.arunod.us/profile.jpg",
                    "width": 400,
                    "height": 400
                  },
                  "jobTitle": "Web Developer and Cybersecurity Student",
                  "nationality": {
                    "@type": "Country",
                    "name": "Sri Lanka"
                  },
                  "affiliation": {
                    "@type": "EducationalOrganization",
                    "name": "SLIIT University",
                    "url": "https://www.sliit.lk/",
                    "address": {
                      "@type": "PostalAddress",
                      "addressCountry": "LK",
                      "addressLocality": "Colombo"
                    }
                  },
                  "sameAs": [
                    "https://www.linkedin.com/in/arunod-manohara-7613b6230/",
                    "https://twitter.com/arunodmanohara",
                    "https://github.com/arunodmanoharaofficial",
                    "https://www.instagram.com/arunodmanoharaofficial",
                    "https://www.facebook.com/share/1G4SKRrsj8/",
                    "https://open.spotify.com/user/31o6pgalotkdzvbczitx56mghigi"
                  ],
                  "knowsAbout": [
                    "Python", "Java", "Docker", "WireGuard", "VPN Tunneling",
                    "Cybersecurity", "Ethical Hacking", "Web Development",
                    "Network Security", "Linux", "Secure Automation",
                    "Kubernetes", "Threat Modeling", "Rust"
                  ],
                  "email": "contact@arunod.us",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "professional",
                    "email": "contact@arunod.us",
                    "availableLanguage": "English"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.arunod.us/#website",
                  "url": "https://www.arunod.us/",
                  "name": "Arunod Manohara — Portfolio",
                  "alternateName": ["arunodmanoharaofficial", "Arunod Portfolio"],
                  "description": "Official portfolio of Arunod Manohara (arunodmanoharaofficial) — Web Developer and Cybersecurity Student from SLIIT University, Sri Lanka.",
                  "inLanguage": "en-US",
                  "about": { "@id": "https://www.arunod.us/#person" },
                  "publisher": { "@id": "https://www.arunod.us/#person" },
                  "author": { "@id": "https://www.arunod.us/#person" },
                  "keywords": "Arunod Manohara, arunodmanoharaofficial, cybersecurity, web developer, SLIIT",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.arunod.us/?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "ProfilePage",
                  "url": "https://www.arunod.us/",
                  "mainEntity": { "@id": "https://www.arunod.us/#person" },
                  "name": "Arunod Manohara Official Portfolio",
                  "description": "Official portfolio page of Arunod Manohara, a Web Developer and Cybersecurity Student from SLIIT University Sri Lanka."
                }
              ]
            })
          }}
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=JetBrains+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@400;700;800;900&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <link rel="preload" as="image" href="/profile.jpg" fetchPriority="high" />
        
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="geo.region" content="LK" />
        <meta name="geo.placename" content="Sri Lanka" />
        
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `.reveal { opacity: 1 !important; transform: none !important; }` }} />
        </noscript>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
