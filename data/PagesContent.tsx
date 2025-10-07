// pagesInfoData.tsx
import { ReactNode } from 'react';
import CeoDesk from '@/components/pageComponents/AboutUs/CeoDesk';
import Founder from '@/components/pageComponents/AboutUs/Founder';
import AdvisoryTeam from '@/components/pageComponents/AboutUs/AdvisoryTeam';
import MediaGallery from '@/components/pageComponents/AboutUs/MediaGallery';
import AboutUs from '@/components/pageComponents/AboutUs/AboutUs';

 //Record here is used to define the structure of the nested objects within contentMap. since the about us must have a type just as others, and you can not call it a string cos of its content, so we use Record to define it. about us object = another about us object which contains a component and strings so we use Record again to define the structure of that object. so without the record here, typescript will throw an error since the two about us are not strings and are written as strings.

//Record is a TypeScript utility type that creates an object type with:

// keys of type string or values of a specified type
//e.g Record<string, number>
//means 
// {
  //[key: string]: number
  //}
export const contentMap: Record<string, Record<string,
     {component: ReactNode; 
     title: string;
     description: string }>
> = {
  'about-us': {
    'about-us': {
      component: <AboutUs />,
      title: 'About Us',
      description: 'Regal Care Hospital’s Mission, Values, and Journey',
    },
    'ceos-desk': {
      component: <CeoDesk />,
      title: 'Message From The CEO',
      description: 'Our History',
    },
    'founder': {
      component: <Founder />,
      title: 'Meet the Founder',
      description: 'The visionary behind Regal Care Hospital',
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
