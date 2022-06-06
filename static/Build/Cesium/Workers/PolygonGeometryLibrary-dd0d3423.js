define(["exports","./ArcType-fc72c06c","./arrayRemoveDuplicates-ea800094","./Matrix2-7fbd2afb","./ComponentDatatype-be80d12c","./defaultValue-81eec7ed","./EllipsoidRhumbLine-c2325569","./GeometryAttribute-ee435129","./GeometryAttributes-32b29525","./GeometryPipeline-1156ffd7","./IndexDatatype-a852edb7","./PolygonPipeline-5c95f197","./Transforms-c7276bed"],(function(e,t,n,i,o,r,s,a,c,l,u,h,f){"use strict";function p(){this._array=[],this._offset=0,this._length=0}Object.defineProperties(p.prototype,{length:{get:function(){return this._length}}}),p.prototype.enqueue=function(e){this._array.push(e),this._length++},p.prototype.dequeue=function(){if(0===this._length)return;const e=this._array;let t=this._offset;const n=e[t];return e[t]=void 0,t++,t>10&&2*t>e.length&&(this._array=e.slice(t),t=0),this._offset=t,this._length--,n},p.prototype.peek=function(){if(0!==this._length)return this._array[this._offset]},p.prototype.contains=function(e){return-1!==this._array.indexOf(e)},p.prototype.clear=function(){this._array.length=this._offset=this._length=0},p.prototype.sort=function(e){this._offset>0&&(this._array=this._array.slice(this._offset),this._offset=0),this._array.sort(e)};const d={computeHierarchyPackedLength:function(e){let t=0;const n=[e];for(;n.length>0;){const e=n.pop();if(!r.defined(e))continue;t+=2;const o=e.positions,s=e.holes;if(r.defined(o)&&(t+=o.length*i.Cartesian3.packedLength),r.defined(s)){const e=s.length;for(let t=0;t<e;++t)n.push(s[t])}}return t},packPolygonHierarchy:function(e,t,n){const o=[e];for(;o.length>0;){const e=o.pop();if(!r.defined(e))continue;const s=e.positions,a=e.holes;if(t[n++]=r.defined(s)?s.length:0,t[n++]=r.defined(a)?a.length:0,r.defined(s)){const e=s.length;for(let o=0;o<e;++o,n+=3)i.Cartesian3.pack(s[o],t,n)}if(r.defined(a)){const e=a.length;for(let t=0;t<e;++t)o.push(a[t])}}return n},unpackPolygonHierarchy:function(e,t){const n=e[t++],o=e[t++],r=new Array(n),s=o>0?new Array(o):void 0;for(let o=0;o<n;++o,t+=i.Cartesian3.packedLength)r[o]=i.Cartesian3.unpack(e,t);for(let n=0;n<o;++n)s[n]=d.unpackPolygonHierarchy(e,t),t=s[n].startingIndex,delete s[n].startingIndex;return{positions:r,holes:s,startingIndex:t}}},y=new i.Cartesian3;function g(e,t,n,o){return i.Cartesian3.subtract(t,e,y),i.Cartesian3.multiplyByScalar(y,n/o,y),i.Cartesian3.add(e,y,y),[y.x,y.y,y.z]}d.subdivideLineCount=function(e,t,n){const r=i.Cartesian3.distance(e,t)/n,s=Math.max(0,Math.ceil(o.CesiumMath.log2(r)));return Math.pow(2,s)};const m=new i.Cartographic,C=new i.Cartographic,b=new i.Cartographic,T=new i.Cartesian3;d.subdivideRhumbLineCount=function(e,t,n,i){const r=e.cartesianToCartographic(t,m),a=e.cartesianToCartographic(n,C),c=new s.EllipsoidRhumbLine(r,a,e).surfaceDistance/i,l=Math.max(0,Math.ceil(o.CesiumMath.log2(c)));return Math.pow(2,l)},d.subdivideLine=function(e,t,n,o){const s=d.subdivideLineCount(e,t,n),a=i.Cartesian3.distance(e,t),c=a/s;r.defined(o)||(o=[]);const l=o;l.length=3*s;let u=0;for(let n=0;n<s;n++){const i=g(e,t,n*c,a);l[u++]=i[0],l[u++]=i[1],l[u++]=i[2]}return l},d.subdivideRhumbLine=function(e,t,n,i,a){const c=e.cartesianToCartographic(t,m),l=e.cartesianToCartographic(n,C),u=new s.EllipsoidRhumbLine(c,l,e),h=u.surfaceDistance/i,f=Math.max(0,Math.ceil(o.CesiumMath.log2(h))),p=Math.pow(2,f),d=u.surfaceDistance/p;r.defined(a)||(a=[]);const y=a;y.length=3*p;let g=0;for(let t=0;t<p;t++){const n=u.interpolateUsingSurfaceDistance(t*d,b),i=e.cartographicToCartesian(n,T);y[g++]=i.x,y[g++]=i.y,y[g++]=i.z}return y};const w=new i.Cartesian3,I=new i.Cartesian3,x=new i.Cartesian3,v=new i.Cartesian3;d.scaleToGeodeticHeightExtruded=function(e,t,n,o,s){o=r.defaultValue(o,i.Ellipsoid.WGS84);const a=w;let c=I;const l=x;let u=v;if(r.defined(e)&&r.defined(e.attributes)&&r.defined(e.attributes.position)){const r=e.attributes.position.values,h=r.length/2;for(let e=0;e<h;e+=3)i.Cartesian3.fromArray(r,e,l),o.geodeticSurfaceNormal(l,a),u=o.scaleToGeodeticSurface(l,u),c=i.Cartesian3.multiplyByScalar(a,n,c),c=i.Cartesian3.add(u,c,c),r[e+h]=c.x,r[e+1+h]=c.y,r[e+2+h]=c.z,s&&(u=i.Cartesian3.clone(l,u)),c=i.Cartesian3.multiplyByScalar(a,t,c),c=i.Cartesian3.add(u,c,c),r[e]=c.x,r[e+1]=c.y,r[e+2]=c.z}return e},d.polygonOutlinesFromHierarchy=function(e,t,o){const s=[],a=new p;let c,l,u;for(a.enqueue(e);0!==a.length;){const e=a.dequeue();let h=e.positions;if(t)for(u=h.length,c=0;c<u;c++)o.scaleToGeodeticSurface(h[c],h[c]);if(h=n.arrayRemoveDuplicates(h,i.Cartesian3.equalsEpsilon,!0),h.length<3)continue;const f=e.holes?e.holes.length:0;for(c=0;c<f;c++){const h=e.holes[c];let f=h.positions;if(t)for(u=f.length,l=0;l<u;++l)o.scaleToGeodeticSurface(f[l],f[l]);if(f=n.arrayRemoveDuplicates(f,i.Cartesian3.equalsEpsilon,!0),f.length<3)continue;s.push(f);let p=0;for(r.defined(h.holes)&&(p=h.holes.length),l=0;l<p;l++)a.enqueue(h.holes[l])}s.push(h)}return s},d.polygonsFromHierarchy=function(e,t,o,s){const a=[],c=[],l=new p;for(l.enqueue(e);0!==l.length;){const e=l.dequeue();let u=e.positions;const f=e.holes;let p,d;if(o)for(d=u.length,p=0;p<d;p++)s.scaleToGeodeticSurface(u[p],u[p]);if(u=n.arrayRemoveDuplicates(u,i.Cartesian3.equalsEpsilon,!0),u.length<3)continue;let y=t(u);if(!r.defined(y))continue;const g=[];let m=h.PolygonPipeline.computeWindingOrder2D(y);m===h.WindingOrder.CLOCKWISE&&(y.reverse(),u=u.slice().reverse());let C=u.slice();const b=r.defined(f)?f.length:0,T=[];let w;for(p=0;p<b;p++){const e=f[p];let a=e.positions;if(o)for(d=a.length,w=0;w<d;++w)s.scaleToGeodeticSurface(a[w],a[w]);if(a=n.arrayRemoveDuplicates(a,i.Cartesian3.equalsEpsilon,!0),a.length<3)continue;const c=t(a);if(!r.defined(c))continue;m=h.PolygonPipeline.computeWindingOrder2D(c),m===h.WindingOrder.CLOCKWISE&&(c.reverse(),a=a.slice().reverse()),T.push(a),g.push(C.length),C=C.concat(a),y=y.concat(c);let u=0;for(r.defined(e.holes)&&(u=e.holes.length),w=0;w<u;w++)l.enqueue(e.holes[w])}a.push({outerRing:u,holes:T}),c.push({positions:C,positions2D:y,holes:g})}return{hierarchy:a,polygons:c}};const E=new i.Cartesian2,A=new i.Cartesian3,P=new f.Quaternion,_=new i.Matrix3;d.computeBoundingRectangle=function(e,t,n,o,s){const a=f.Quaternion.fromAxisAngle(e,o,P),c=i.Matrix3.fromQuaternion(a,_);let l=Number.POSITIVE_INFINITY,u=Number.NEGATIVE_INFINITY,h=Number.POSITIVE_INFINITY,p=Number.NEGATIVE_INFINITY;const d=n.length;for(let e=0;e<d;++e){const o=i.Cartesian3.clone(n[e],A);i.Matrix3.multiplyByVector(c,o,o);const s=t(o,E);r.defined(s)&&(l=Math.min(l,s.x),u=Math.max(u,s.x),h=Math.min(h,s.y),p=Math.max(p,s.y))}return s.x=l,s.y=h,s.width=u-l,s.height=p-h,s},d.createGeometryFromPositions=function(e,n,i,r,s,c){let u=h.PolygonPipeline.triangulate(n.positions2D,n.holes);u.length<3&&(u=[0,1,2]);const f=n.positions;if(r){const e=f.length,t=new Array(3*e);let n=0;for(let i=0;i<e;i++){const e=f[i];t[n++]=e.x,t[n++]=e.y,t[n++]=e.z}const i=new a.Geometry({attributes:{position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:t})},indices:u,primitiveType:a.PrimitiveType.TRIANGLES});return s.normal?l.GeometryPipeline.computeNormal(i):i}return c===t.ArcType.GEODESIC?h.PolygonPipeline.computeSubdivision(e,f,u,i):c===t.ArcType.RHUMB?h.PolygonPipeline.computeRhumbLineSubdivision(e,f,u,i):void 0};const G=[],L=new i.Cartesian3,M=new i.Cartesian3;d.computeWallGeometry=function(e,n,r,s,l){let h,f,p,y,g,m=e.length,C=0;if(s)for(f=3*m*2,h=new Array(2*f),p=0;p<m;p++)y=e[p],g=e[(p+1)%m],h[C]=h[C+f]=y.x,++C,h[C]=h[C+f]=y.y,++C,h[C]=h[C+f]=y.z,++C,h[C]=h[C+f]=g.x,++C,h[C]=h[C+f]=g.y,++C,h[C]=h[C+f]=g.z,++C;else{const i=o.CesiumMath.chordLength(r,n.maximumRadius);let s=0;if(l===t.ArcType.GEODESIC)for(p=0;p<m;p++)s+=d.subdivideLineCount(e[p],e[(p+1)%m],i);else if(l===t.ArcType.RHUMB)for(p=0;p<m;p++)s+=d.subdivideRhumbLineCount(n,e[p],e[(p+1)%m],i);for(f=3*(s+m),h=new Array(2*f),p=0;p<m;p++){let o;y=e[p],g=e[(p+1)%m],l===t.ArcType.GEODESIC?o=d.subdivideLine(y,g,i,G):l===t.ArcType.RHUMB&&(o=d.subdivideRhumbLine(n,y,g,i,G));const r=o.length;for(let e=0;e<r;++e,++C)h[C]=o[e],h[C+f]=o[e];h[C]=g.x,h[C+f]=g.x,++C,h[C]=g.y,h[C+f]=g.y,++C,h[C]=g.z,h[C+f]=g.z,++C}}m=h.length;const b=u.IndexDatatype.createTypedArray(m/3,m-6*e.length);let T=0;for(m/=6,p=0;p<m;p++){const e=p,t=e+1,n=e+m,r=n+1;y=i.Cartesian3.fromArray(h,3*e,L),g=i.Cartesian3.fromArray(h,3*t,M),i.Cartesian3.equalsEpsilon(y,g,o.CesiumMath.EPSILON10,o.CesiumMath.EPSILON10)||(b[T++]=e,b[T++]=n,b[T++]=t,b[T++]=t,b[T++]=n,b[T++]=r)}return new a.Geometry({attributes:new c.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:h})}),indices:b,primitiveType:a.PrimitiveType.TRIANGLES})},e.PolygonGeometryLibrary=d}));
