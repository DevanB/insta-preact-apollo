import { h, Component } from 'preact';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Post extends Component {
  render({ post }) {
    return (
      <div class="pa3 bg-black-05 ma3">
        <div
          class="w-100"
          style={{
            backgroundImage: `url(${post.imageUrl})`,
            backgroundSize: 'cover',
            paddingBottom: '100%'
          }}
        />
        <div class="pt3">
          {post.description} {' '}
          <span class="red f6 pointer dim" onClick={this.handleDelete}>
            Delete
          </span>
        </div>
      </div>
    );
  }

  handleDelete = () => {
    this.props.deletePost({
      variables: { id: this.props.post.id },
      update: (store, { data: { deletePost } }) => {
        const data = store.readQuery({ query: ALL_POSTS_QUERY });
        data.allPosts.filter(post => post.id !== deletePost.id);
        store.writeQuery({
          query: ALL_POSTS_QUERY,
          data
        });
      }
    });
    this.props.refresh();
  };
}

const ALL_POSTS_QUERY = gql`
  query AllPosts {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default graphql(DELETE_MUTATION, { name: 'deletePost' })(Post);
