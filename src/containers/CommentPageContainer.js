import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import PostPlaceholder from '../components/Post/PostPlaceholder';
import CommentPage from '../components/CommentPage/CommentPage';
import NotFound from '../components/NotFound/NotFound';
import COMMENT_QUERY from '../queries/Comment.graphql';

const CommentPageContainer = (props) => {
  const id = props.match.params.id;

  return (
    <Query
      query={COMMENT_QUERY}
      variables={{ id }}
      fetchPolicy="network-only"
    >
      {
        ({ data, loading, error }) => {
          if (loading) {
            return <PostPlaceholder />;
          } // TODO: Make a comment page placholder?

          if (error) {
            return 'Failed loading the comment. Please try again';
          }


          if (!data.comment) {
            return <NotFound text="The comment you’re looking for doesn’t exist." />;
          }

          return <CommentPage {...data.comment} />;
        }
      }
    </Query>
  );
};

CommentPageContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default CommentPageContainer;

// TODO: PropTypes
