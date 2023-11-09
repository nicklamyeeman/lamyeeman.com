/* Add a comment at first line to avoid bug in css ordering https://github.com/vercel/next.js/issues/16630#issuecomment-1037305875  */
import '../styles/globals.css';

import React from 'react';

export default function NotFound() {
    return (
        <div className={'bg-stone-600 w-full h-8 -mt-8'}></div>
    );
}
