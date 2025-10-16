// app/blog/page.tsx
import BlogCard from "@/components/BlogComponents/BlogCard";
import Pagination from "@/components/BlogComponents/Pagination";
import { getPosts } from "@/apiServices/postServices";
import Ticker from "@/components/BlogComponents/Ticker";
import SectionHeading from "@/components/sectionHeading";



type Props = { searchParams?: 
  { page?: string; 
    q?: string 
  } 
};



export default async function BlogPage({ searchParams }: Props) {
  const page = Number(searchParams?.page ?? 1);
  const q = searchParams?.q ?? undefined;

  const data = await getPosts({ page, limit: 8, search: q, publishedOnly: true, category: "Health Tips" });

  return (
    <main className="w-full bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-200 ">
<section className= "w-full h-auto bg-blue-300 flex flex-col items-center justify-center text-center p-10">
</section>
<div>
  <Ticker />
</div>
<div>
 <SectionHeading title= {<h1 className='header text-center'> News Update</h1>} />
    </div>

 <main className="py-10">
      <BlogCard posts={data.items} />
    </main>

   


   <div className="mt-8">
        <Pagination page={data.page} pages={data.pages} />
      </div>
   
    </main>
  );
}
