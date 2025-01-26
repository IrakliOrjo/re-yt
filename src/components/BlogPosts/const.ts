import BlogPhoto1 from '../../assets/images/blog1.jpg';
import BlogPhoto2 from '../../assets/images/blog2.jpg';
import BlogPhoto3 from '../../assets/images/blog3.jpg';

export const BLOG_POSTS_CARD = [
    {
        image: BlogPhoto1,
        title: 'How to build a blog with React and Markdown',
        date: 'January 2025-01-01',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan'
    },
    {
        image: BlogPhoto2,
        title: 'How to build a blog with React and Markdown',
        date: 'August 2024-08-11',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan'
    },
    {
        image: BlogPhoto3,
        title: 'How to build a blog with React and Markdown',
        date: 'May 2024-05-21',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan'
    }
] as const