import Pagination from "@/components/BlogComponents/Pagination";
import Ticker from "@/components/BlogComponents/Ticker";
import SectionHeading from "@/components/sectionHeading";
import LatestPost from "@/components/BlogComponents/LatestPost";
import CategorySection from "@/components/BlogComponents/CategorySection";
import BlogNavbar from "@/components/BlogComponents/BlogNavbar";
import Link from "next/link";



export const revalidate = 60; // revalidate every 60s

type Category = {
  _id: string;
  name: string;
};

export default async function BlogPage() {


  // Fetch categories
  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  const categories: Category[] = categoriesRes.ok ? await categoriesRes.json() : [];

  // Fetch posts (latest)
  const postsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogPosts?publishedOnly=true`);
  const postsData = postsRes.ok ? await postsRes.json() : { posts: [], page: 1, pages: 1 };

  // Fetch recent comments
  const recentCommentsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/recent`);
  const recentComments = recentCommentsRes.ok ? await recentCommentsRes.json() : [];

  // Fetch archives
  const archivesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/archives`);
  const archives = archivesRes.ok ? await archivesRes.json() : [];  


  return (
    <main className="w-full bg-zinc-100 dark:bg-zinc-900 text-dark-300 dark:text-zinc-200">
    <BlogNavbar />
      <Ticker />

      <section className="w-full lg:pt-10 px-4 lg:px-5 pb-10 gap-4">
      
        <div>
          <div> 
          <SectionHeading title={<h1 className="header text-left">Latest Posts</h1>} />
          <LatestPost />
          </div>

              <div className="lg:px-20 px-5">
    
          {categories.map((cat) => (
            <div key={cat._id} className="mt-12">
              <SectionHeading title={<h2 className="header mt-20 text-left">{cat.name}</h2>} />
              <CategorySection category={cat.name} />
            </div>
          ))}
          </div>
        </div>

 {/* RIGHT SIDEBAR */}
        <aside className="block lg:hidden space-y-10 px-20 py-36 min-h-[600px] overflow-y-auto">
          {/* ARCHIVES */}
        <div>
  <h1 className="font-condensed text-xl lg:text-2xl xl:text-3xl font-bold text-left">
    Archives
  </h1>

  {archives.length > 0 ? (
    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
      {archives.map((archive: any) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

        const monthLabel = `${monthNames[archive._id.month - 1]} ${archive._id.year}`;

        return (
          <li key={`${archive._id.year}-${archive._id.month}`}>
            <Link
              href={`/blog/archives/${archive._id.year}/${archive._id.month}`}
              className="hover:text-yellow-600 cursor-pointer"
            >
              {monthLabel} ({archive.count})
            </Link>
          </li>
        );
      })}
    </ul>
  ) : (
    <p className="text-gray-500 text-sm">No Archive Available </p>
  )}
</div>


        
          <div>
           <h1 className="font-condensed text-xl lg:text-2xl xl:text-3xl  font-bold text-left">Recent Comments</h1>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              {recentComments.length > 0 ? (
                recentComments.slice(0, 10).map((c: any) => (
                  <li key={c._id}>
                    <span className="font-medium">{c.commenterName}:</span>{" "}
                    “{c.content.length > 40 ? c.content.slice(0, 40) + "..." : c.content}”
                  </li>
                ))
              ) : (
                <p>No recent comments</p>
              )}
            </ul>
          </div>
        </aside>


        {/* Pagination */}
        {postsData.pages > 1 && (
          <div className="mt-8">
            <Pagination page={postsData.page} pages={postsData.pages} />
          </div>
        )}
      </section>
    </main>
  );
}
