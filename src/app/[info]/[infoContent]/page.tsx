import React from 'react'
import { notFound } from "next/navigation";
import { contentMap } from '../../../../data/pagesInfoData';
import PagesBackgroundHeader from '@/components/PagesBackgroundHeader';


interface Props {
  params: {
    info: string;
    infoContent: string;
  };
}

export default function InfoPage({ params }: Props) {
    
const section = contentMap[params.info]?.[params.infoContent];

  if (!section) return notFound();

   const {  component: PageComponent, title, description } = section;

  return(
     <div className="min-h-screen w-full pb-40 bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-100">
      <PagesBackgroundHeader title={title} description={description} />
      <div className="px-4 md:px-10 lg:px-32 my-12">{PageComponent}</div>
    </div>
  )
}





