import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = (props) => (
  <ContentLoader
    width="100%"
    height="auto"
    viewBox="0 0 1000 300"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="15" y="15" rx="3" ry="3" width="550" height="1500" />
    <rect x="585" y="15" rx="3" ry="3" width="80" height="50" />
    <rect x="585" y="77" rx="3" ry="3" width="250" height="15" />
    <rect x="585" y="96" rx="3" ry="3" width="350" height="2" />
    <rect x="585" y="105" rx="3" ry="3" width="100" height="15" />
    <rect x="585" y="125" rx="3" ry="3" width="120" height="15" />
    <rect x="585" y="150" rx="3" ry="3" width="110" height="15" />
    <rect x="585" y="175" rx="3" ry="3" width="15" height="15" />
    <rect x="612" y="175" rx="3" ry="3" width="150" height="15" />
    <rect x="585" y="195" rx="3" ry="3" width="15" height="15" />
    <rect x="612" y="195" rx="3" ry="3" width="150" height="15" />
    <rect x="585" y="215" rx="3" ry="3" width="15" height="15" />
    <rect x="612" y="215" rx="3" ry="3" width="150" height="15" />
    <rect x="585" y="235" rx="3" ry="3" width="15" height="15" />
    <rect x="612" y="235" rx="3" ry="3" width="150" height="15" />
    <rect x="585" y="265" rx="3" ry="3" width="100" height="15" />
  </ContentLoader>
);

export default Loader;
