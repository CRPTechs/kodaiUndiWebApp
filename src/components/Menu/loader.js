import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    width="100%"
    height="auto"
    viewBox="0 0 1000 300"
    backgroundColor="#a9a9a9"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="15" y="15" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="45" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="75" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="105" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="135" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="165" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="195" rx="3" ry="3" width="1000" height="20" />
    <rect x="15" y="225" rx="3" ry="3" width="1000" height="20" />
  </ContentLoader>
);

export default Loader;
