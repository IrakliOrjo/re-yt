import { BlogPostCard } from "./components"
import { BLOG_POSTS_CARD } from "./const"
import { motion } from 'framer-motion'

export const BlogPosts = () => {
  return (
    <div className="bg-slate-100 flex flex-col justify-center items-center py-20">
            <motion.p 
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration: 0.5, delay:0.2}}
              className="text-blue-600 text-[20px]">Latest New</motion.p>
            <motion.h1 
              initial={{opacity:0, y:20}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration: 0.5, delay:0.4}}
              className="text-[36px] mb-7 font-bold text-gray-800"
              >From Our Blog
            </motion.h1>
            <div className="flex flex-col lg:flex-row gap-8 px-2 lg:gap-5">
                {BLOG_POSTS_CARD.map(({image, title,date,description}, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{opacity:0, y:50}}
                        whileInView={{opacity:1, y:0}}
                        viewport={{once:true}}
                        transition={{
                          duration:0.7,
                          delay: 0.6 + (index * 0.2),
                          ease: [0.2, 0.65, 0.3, 0.9]
                        }}
                        >

                          <BlogPostCard 
                                    image={image} 
                                    title={title} 
                                    date={date} 
                                    description={description} 
                                    />
                       </motion.div>
                            )
                })}
            </div>

    </div>
  )
}

 