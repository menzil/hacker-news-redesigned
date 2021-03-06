import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { BASE_URL } from '../constants';

const Head = ({ url, title, description }) => {
  const completeURL = url ? BASE_URL + url : BASE_URL;
  const imageURL = `/hn-social-media.png`;

  return (
    <Helmet
      defaultTitle="Hacker News"
      titleTemplate="%s – Hacker News"
    >
      <link rel="canonical" href={completeURL} />

      <meta name="description" content={description} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@newsycombinator" />
      <meta name="twitter:url" content={completeURL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageURL} />

      {/* Open Graph */}
      <meta property="og:url" content={completeURL} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={imageURL} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Hacker News" />
      <meta property="og:locale" content="en_US" />

      <title>{title}</title>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
};

Head.defaultProps = {
  description: 'A redesigned Hacker News clone written in React',
};

export default Head;

// TODO: Ideally the description should be shortened.
//       If the first paragraph is 200 chars -> use it, otherwise find
//       some meaningful way to slice first 200 chars (ends with period, comma, etc)
