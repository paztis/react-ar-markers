import React from 'react';

export default function mapMarker({title, classNames}) {
  const style = {
    width: '30px',
    height: '30px',
    backgroundColor: classNames ? 'blue' : 'red',
  };
  return (
    <div style={style} className={`${classNames ? `map-marker ${classNames}` : 'map-marker' }`}>{title}</div>
  );
}
