import React from 'react';

export default function CloudyCard({
  city ,
  p = null,
  icon = null ,
  degree = null,
  linkStr = null,
  title = null,
  p2 = null
}) {
  
  const doc = document.documentElement;
  const root = getComputedStyle(doc);
  const rootColor = root.getPropertyValue('--color');

  return (
    <div className='clouds'>

  <svg  width="100%" viewBox="0 0 500 400">
  <filter id="f1" x="0" y="0" width="100%" height="100%">
      <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>

    <g  fill="none">
    {/* <circle cx="89" cy="70" r="40" stroke-width="3"  fill={rootGlassBg} />
    <circle cx="190" cy="70" r="40" stroke-width="3"   fill={rootGlassBg} />
    <circle cx="89" cy="310" r="40" stroke-width="3"   fill={rootGlassBg} />
    <ellipse cx="400" cy="275" rx="50" ry="73"     fill={rootGlassBg}/>
    <path d="M216,152 C216,171 216,208 280,212" stroke={rootGlassBg} strokeWidth={28}/>
    <rect  x="81" y="30" width="120" height="100"   fill={rootGlassBg}/>
    <rect  x="50" y="80" width="178" height="240"   fill={rootGlassBg}/>
    <rect  x="81" y="200" width="315" height="150"   fill={rootGlassBg}/> */}
      <path d="M100,350 L400,350 M400,350 Q440,348 450,300 M450,300 L450,250 M450,250 Q445,198 400,200 M400,200 L280,200 M280,200 Q225,198 230,150 M230,150 L230,80 M230,80 Q225,28 190,30 M190,30 L100,30 M100,30 Q48,28 50,80 M50,80 L50,300 M50,300 Q48,348 100,350" strokeWidth={2} stroke={rootColor}  filter="url(#f1)"/>
    </g>


      <g textAnchor="start" stroke={rootColor}>
        
        {p && 
          <text x="80" y="120" fontSize="30" >{p}</text>
        }

        {
          degree &&
          <text x="80" y="120" fill="black" strokeWidth="2" fontSize="35">{degree}</text>
        }

        {linkStr && (
              <a href={`/app?place=${city}`} transform="translate(80, 165)">
                <text textAnchor="start" fill="black"  fontSize="23" >{linkStr}</text>
              </a>
            )}
        
        {icon && (
            <image xlinkHref={icon} x="200" y="-20" width="250"  />
        )}

        {title && 
          <text x="80" y="300" fill="black" strokeWidth="2" fontSize="35" >{title}</text>  
        }  

        {p2 && 
        <text x="290" y="300" fill="black" fontSize="30">{p2}</text>  
        }

      </g>
    </svg>
    </div>
  );
}
