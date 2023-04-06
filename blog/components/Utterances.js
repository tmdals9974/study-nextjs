import React, { memo } from 'react';

function Utterances() {
  return (
    <section
      ref={(elem) => {
        if (!elem) {
          return;
        }
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.async = true;
        scriptElement.crossOrigin = 'anonymous';
        scriptElement.setAttribute('repo', 'tmdals9974/study-nextjs');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'github-light');
        elem.appendChild(scriptElement);
      }}
    />
  );
}

export default memo(Utterances);
