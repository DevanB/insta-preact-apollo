import { h, Component } from 'preact';
import { route } from 'preact-router';
import linkState from 'linkstate';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreatePage extends Component {
  state = {
    description: '',
    imageUrl: ''
  };

  render({}, { imageUrl, description }) {
    return (
      <div class="w-100 pa4 flex justify-center">
        <div style={{ maxWidth: 400 }} class="">
          <input
            class="w-100 pa3 mv2"
            value={description}
            placeholder="Description"
            onChange={linkState(this, 'description')}
          />
          <input
            class="w-100 pa3 mv2"
            value={imageUrl}
            placeholder="Image Url"
            onChange={linkState(this, 'imageUrl')}
          />
          {imageUrl && <img src={imageUrl} role="presentation" class="w-100 mv3" />}
          {description &&
            imageUrl &&
            <button class="pa3 bg-black-10 bn dim ttu pointer" onClick={this.handlePost}>
              Post
            </button>}
        </div>
      </div>
    );
  }

  handlePost = () => {
    const { description, imageUrl } = this.state;
    this.props
      .createPost({
        variables: { description, imageUrl },
        update: (store, { data: { createPost } }) => {
          const data = store.readQuery({ query: ALL_POSTS_QUERY });
          data.allPosts.splice(0, 0, createPost);
          store.writeQuery({
            query: ALL_POSTS_QUERY,
            data
          });
        }
      })
      .then(() => route('/'));
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

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      description
      imageUrl
    }
  }
`;

export default graphql(CREATE_POST_MUTATION, { name: 'createPost' })(CreatePage);
