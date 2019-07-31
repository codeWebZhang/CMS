import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default function CustomScrollbars(props: any) {
  return (
    <Scrollbars
      {...props}
      autoHide
      renderTrackHorizontal={(props) => (
        <div {...props} style={{ display: 'none' }} className="track-horizontal" />
      )}
    />
  );
}
