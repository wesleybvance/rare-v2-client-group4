import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPosts } from '../../utils/data/postdata';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchBar() {
  const [searchPosts, setSearchPosts] = useState([]);

  const router = useRouter();
  const { searchbar } = router.query;
  const { user } = useAuth();

  const searchAllPosts = () => {
    getPosts().then((posts) => {
      const filteredPosts = posts.filter((post) => {
        const searchTerm = searchbar?.toLowerCase();
        const postAttributes = Object.values(post).join(' ').toLowerCase(); // Combine all attributes for search
        return postAttributes.includes(searchTerm);
      });

      const sortedPosts = filteredPosts.sort((a, b) => ((a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1));
      setSearchPosts(sortedPosts);
    });
  };

  useEffect(() => {
    searchAllPosts();
    return () => {
      setSearchPosts([]);
    };
  }, [searchbar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {(searchPosts.length === 0 ? (
          <div>
            No Search Results
          </div>
        )
          : searchPosts.map((post) => (
            <div className="d-flex" key={post.id}>
              <PostCard
                postObj={post}
                onUpdate={searchAllPosts}
                id={post.id}
                userId={user.id}
                title={post.title}
                publicationDate={post.publication_date}
                imageUrl={post.image_url}
                content={post.content}
              />
            </div>
          )))}
      </div>
    </>
  );
}
