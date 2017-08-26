import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import Post from '../../components/Post';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ListPage extends Component {
  render({ data }) {
    if (data.loading) {
      return <div>Loading</div>;
    }

    return (
      <div class="w-100 flex justify-center">
        <Link href="/create" class="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">
          + New Post
        </Link>
        {data.allPosts.length > 0 &&
          <div class="w-100" style={{ maxWidth: 400 }}>
            {data.allPosts.map(post => <Post key={post.id} post={post} refresh={() => data.refetch()} />)}
          </div>}
        {data.allPosts.length === 0 && <div>No posts yet!</div>}
      </div>
    );
  }
}

const ALL_POSTS_QUERY = gql`
  query allPosts {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`;

export default graphql(ALL_POSTS_QUERY)(ListPage);
