import { BlogPostCard } from "./components"
import { BLOG_POSTS_CARD } from "./const"

export const BlogPosts = () => {
  return (
    <div className="bg-slate-100 flex flex-col justify-center items-center py-20">
            <p className="text-blue-600 text-[20px]">Latest New</p>
            <h1 className="text-[36px] mb-7 font-bold text-gray-800">From Our Blog</h1>
            <div className="flex flex-col xl:flex-row gap-8">
                {BLOG_POSTS_CARD.map(({image, title,date,description}, index) => {
                    return <BlogPostCard image={image} title={title} date={date} description={description} key={index} />
                })}
            </div>

    </div>
  )
}

 