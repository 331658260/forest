/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.109.2
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as _}from"./chunk-XDDZ2MNJ.js";import{a as G}from"./chunk-CNQZF6QJ.js";import{b as B}from"./chunk-4L65MOP7.js";import{a as b}from"./chunk-MYTTSKBC.js";import{b as L}from"./chunk-R7VOEVKL.js";import{a,b as D,c as z}from"./chunk-DTDIGECF.js";import{a as E}from"./chunk-KTKCENRU.js";import{a as C}from"./chunk-YEJ6O6A4.js";import{a as I}from"./chunk-VGVFMVO3.js";import{e as T}from"./chunk-DBO65MJ7.js";var p={};p.numberOfPoints=function(r,n,o){let e=a.distance(r,n);return Math.ceil(e/o)};p.numberOfPointsRhumbLine=function(r,n,o){let e=Math.pow(r.longitude-n.longitude,2)+Math.pow(r.latitude-n.latitude,2);return Math.max(1,Math.ceil(Math.sqrt(e/(o*o))))};var V=new D;p.extractHeights=function(r,n){let o=r.length,e=new Array(o);for(let t=0;t<o;t++){let l=r[t];e[t]=n.cartesianToCartographic(l,V).height}return e};var Y=new L,W=new a,v=new a,F=new b(a.UNIT_X,0),H=new a,j=new b(a.UNIT_X,0),J=new a,K=new a,O=[];function q(r,n,o){let e=O;e.length=r;let t;if(n===o){for(t=0;t<r;t++)e[t]=n;return e}let u=(o-n)/r;for(t=0;t<r;t++){let d=n+t*u;e[t]=d}return e}var x=new D,N=new D,S=new a,k=new a,Q=new a,M=new _,R=new G;function $(r,n,o,e,t,l,u,d){let i=e.scaleToGeodeticSurface(r,k),w=e.scaleToGeodeticSurface(n,Q),h=p.numberOfPoints(r,n,o),f=e.cartesianToCartographic(i,x),y=e.cartesianToCartographic(w,N),g=q(h,t,l);M.setEndPoints(f,y);let P=M.surfaceDistance/h,c=d;f.height=t;let s=e.cartographicToCartesian(f,S);a.pack(s,u,c),c+=3;for(let m=1;m<h;m++){let A=M.interpolateUsingSurfaceDistance(m*P,N);A.height=g[m],s=e.cartographicToCartesian(A,S),a.pack(s,u,c),c+=3}return c}function tt(r,n,o,e,t,l,u,d){let i=e.cartesianToCartographic(r,x),w=e.cartesianToCartographic(n,N),h=p.numberOfPointsRhumbLine(i,w,o);i.height=0,w.height=0;let f=q(h,t,l);R.ellipsoid.equals(e)||(R=new G(void 0,void 0,e)),R.setEndPoints(i,w);let y=R.surfaceDistance/h,g=d;i.height=t;let P=e.cartographicToCartesian(i,S);a.pack(P,u,g),g+=3;for(let c=1;c<h;c++){let s=R.interpolateUsingSurfaceDistance(c*y,N);s.height=f[c],P=e.cartographicToCartesian(s,S),a.pack(P,u,g),g+=3}return g}p.wrapLongitude=function(r,n){let o=[],e=[];if(T(r)&&r.length>0){n=C(n,L.IDENTITY);let t=L.inverseTransformation(n,Y),l=L.multiplyByPoint(t,a.ZERO,W),u=a.normalize(L.multiplyByPointAsVector(t,a.UNIT_Y,v),v),d=b.fromPointNormal(l,u,F),i=a.normalize(L.multiplyByPointAsVector(t,a.UNIT_X,H),H),w=b.fromPointNormal(l,i,j),h=1;o.push(a.clone(r[0]));let f=o[0],y=r.length;for(let g=1;g<y;++g){let P=r[g];if(b.getPointDistance(w,f)<0||b.getPointDistance(w,P)<0){let c=B.lineSegmentPlane(f,P,d,J);if(T(c)){let s=a.multiplyByScalar(u,5e-9,K);b.getPointDistance(d,f)<0&&a.negate(s,s),o.push(a.add(c,s,new a)),e.push(h+1),a.negate(s,s),o.push(a.add(c,s,new a)),h=1}}o.push(a.clone(r[g])),h++,f=P}e.push(h)}return{positions:o,lengths:e}};p.generateArc=function(r){T(r)||(r={});let n=r.positions;if(!T(n))throw new I("options.positions is required.");let o=n.length,e=C(r.ellipsoid,z.WGS84),t=C(r.height,0),l=Array.isArray(t);if(o<1)return[];if(o===1){let c=e.scaleToGeodeticSurface(n[0],k);if(t=l?t[0]:t,t!==0){let s=e.geodeticSurfaceNormal(c,S);a.multiplyByScalar(s,t,s),a.add(c,s,c)}return[c.x,c.y,c.z]}let u=r.minDistance;if(!T(u)){let c=C(r.granularity,E.RADIANS_PER_DEGREE);u=E.chordLength(c,e.maximumRadius)}let d=0,i;for(i=0;i<o-1;i++)d+=p.numberOfPoints(n[i],n[i+1],u);let w=(d+1)*3,h=new Array(w),f=0;for(i=0;i<o-1;i++){let c=n[i],s=n[i+1],m=l?t[i]:t,A=l?t[i+1]:t;f=$(c,s,u,e,m,A,h,f)}O.length=0;let y=n[o-1],g=e.cartesianToCartographic(y,x);g.height=l?t[o-1]:t;let P=e.cartographicToCartesian(g,S);return a.pack(P,h,w-3),h};var U=new D,et=new D;p.generateRhumbArc=function(r){T(r)||(r={});let n=r.positions;if(!T(n))throw new I("options.positions is required.");let o=n.length,e=C(r.ellipsoid,z.WGS84),t=C(r.height,0),l=Array.isArray(t);if(o<1)return[];if(o===1){let m=e.scaleToGeodeticSurface(n[0],k);if(t=l?t[0]:t,t!==0){let A=e.geodeticSurfaceNormal(m,S);a.multiplyByScalar(A,t,A),a.add(m,A,m)}return[m.x,m.y,m.z]}let u=C(r.granularity,E.RADIANS_PER_DEGREE),d=0,i,w=e.cartesianToCartographic(n[0],U),h;for(i=0;i<o-1;i++)h=e.cartesianToCartographic(n[i+1],et),d+=p.numberOfPointsRhumbLine(w,h,u),w=D.clone(h,U);let f=(d+1)*3,y=new Array(f),g=0;for(i=0;i<o-1;i++){let m=n[i],A=n[i+1],X=l?t[i]:t,Z=l?t[i+1]:t;g=tt(m,A,u,e,X,Z,y,g)}O.length=0;let P=n[o-1],c=e.cartesianToCartographic(P,x);c.height=l?t[o-1]:t;let s=e.cartographicToCartesian(c,S);return a.pack(s,y,f-3),y};p.generateCartesianArc=function(r){let n=p.generateArc(r),o=n.length/3,e=new Array(o);for(let t=0;t<o;t++)e[t]=a.unpack(n,t*3);return e};p.generateCartesianRhumbArc=function(r){let n=p.generateRhumbArc(r),o=n.length/3,e=new Array(o);for(let t=0;t<o;t++)e[t]=a.unpack(n,t*3);return e};var mt=p;export{mt as a};
