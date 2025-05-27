// pagesInfoData.tsx
import { ReactNode } from 'react';
import CeoDesk from '@/components/pageComponents/AboutUs/CeoDesk';
import Founder from '@/components/pageComponents/AboutUs/Founder';
import AdvisoryTeam from '@/components/pageComponents/AboutUs/AdvisoryTeam';
import MediaGallery from '@/components/pageComponents/AboutUs/MediaGallery';
import AboutUs from '@/components/pageComponents/AboutUs/AboutUs';

export const contentMap: Record<
  string,
  Record<string, { 
    component: ReactNode; 
    title: string;
     description: string }>
> = {
  'about-us': {
    'about-us': {
      component: <AboutUs />,
      title: 'About Us',
      description: 'Learn more about Regal Care Hospital’s mission, values, and journey.',
    },
    'from-the-ceos-desk': {
      component: <CeoDesk />,
      title: 'Message From The CEO',
      description: 'A brief history and information about Regal Care Hospital.',
    },
    'founder': {
      component: <Founder />,
      title: 'Meet the Founder',
      description: 'Get to know the visionary behind Regal Care Hospital.',
    },
    'advisory-team': {
      component: <AdvisoryTeam />,
      title: 'Advisory Team',
      description: 'Our team of medical and strategic advisors.',
    },
    'media-gallery': {
      component: <MediaGallery />,
      title: 'Media Gallery',
      description: 'Photos and videos showcasing our journey and services.',
    },
  },

};
