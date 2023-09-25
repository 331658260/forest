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

import{a as wt}from"./chunk-A2NS5WZM.js";import{a as k}from"./chunk-Q5I3HUFC.js";import{a as kt}from"./chunk-XP6ACU7K.js";import{a as Ct}from"./chunk-EL2VM6U2.js";import{b as dt,c as _t,d as R}from"./chunk-XF2PZXQF.js";import{d as pt}from"./chunk-3YXTKO5F.js";import{d as ht}from"./chunk-R7VOEVKL.js";import{a as N}from"./chunk-IX2OLS2H.js";import{a as s,c as ot}from"./chunk-DTDIGECF.js";import{a as M}from"./chunk-KTKCENRU.js";import{a as p}from"./chunk-YEJ6O6A4.js";import{a as z}from"./chunk-VGVFMVO3.js";import{e as E}from"./chunk-DBO65MJ7.js";var yt=new s,vt=new s,Et=new s,Mt=new s,Nt=new s,Rt=new s(1,1,1),Pt=Math.cos,At=Math.sin;function O(n){n=p(n,p.EMPTY_OBJECT);let m=p(n.radii,Rt),i=p(n.innerRadii,m),P=p(n.minimumClock,0),T=p(n.maximumClock,M.TWO_PI),A=p(n.minimumCone,0),b=p(n.maximumCone,M.PI),a=Math.round(p(n.stackPartitions,64)),u=Math.round(p(n.slicePartitions,64)),h=p(n.vertexFormat,k.DEFAULT);if(u<3)throw new z("options.slicePartitions cannot be less than three.");if(a<3)throw new z("options.stackPartitions cannot be less than three.");this._radii=s.clone(m),this._innerRadii=s.clone(i),this._minimumClock=P,this._maximumClock=T,this._minimumCone=A,this._maximumCone=b,this._stackPartitions=a,this._slicePartitions=u,this._vertexFormat=k.clone(h),this._offsetAttribute=n.offsetAttribute,this._workerName="createEllipsoidGeometry"}O.packedLength=2*s.packedLength+k.packedLength+7;O.pack=function(n,m,i){if(!E(n))throw new z("value is required");if(!E(m))throw new z("array is required");return i=p(i,0),s.pack(n._radii,m,i),i+=s.packedLength,s.pack(n._innerRadii,m,i),i+=s.packedLength,k.pack(n._vertexFormat,m,i),i+=k.packedLength,m[i++]=n._minimumClock,m[i++]=n._maximumClock,m[i++]=n._minimumCone,m[i++]=n._maximumCone,m[i++]=n._stackPartitions,m[i++]=n._slicePartitions,m[i]=p(n._offsetAttribute,-1),m};var bt=new s,xt=new s,Ot=new k,y={radii:bt,innerRadii:xt,vertexFormat:Ot,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,offsetAttribute:void 0};O.unpack=function(n,m,i){if(!E(n))throw new z("array is required");m=p(m,0);let P=s.unpack(n,m,bt);m+=s.packedLength;let T=s.unpack(n,m,xt);m+=s.packedLength;let A=k.unpack(n,m,Ot);m+=k.packedLength;let b=n[m++],a=n[m++],u=n[m++],h=n[m++],t=n[m++],o=n[m++],e=n[m];return E(i)?(i._radii=s.clone(P,i._radii),i._innerRadii=s.clone(T,i._innerRadii),i._vertexFormat=k.clone(A,i._vertexFormat),i._minimumClock=b,i._maximumClock=a,i._minimumCone=u,i._maximumCone=h,i._stackPartitions=t,i._slicePartitions=o,i._offsetAttribute=e===-1?void 0:e,i):(y.minimumClock=b,y.maximumClock=a,y.minimumCone=u,y.maximumCone=h,y.stackPartitions=t,y.slicePartitions=o,y.offsetAttribute=e===-1?void 0:e,new O(y))};O.createGeometry=function(n){let m=n._radii;if(m.x<=0||m.y<=0||m.z<=0)return;let i=n._innerRadii;if(i.x<=0||i.y<=0||i.z<=0)return;let P=n._minimumClock,T=n._maximumClock,A=n._minimumCone,b=n._maximumCone,a=n._vertexFormat,u=n._slicePartitions+1,h=n._stackPartitions+1;u=Math.round(u*Math.abs(T-P)/M.TWO_PI),h=Math.round(h*Math.abs(b-A)/M.PI),u<2&&(u=2),h<2&&(h=2);let t,o,e=0,D=[A],S=[P];for(t=0;t<h;t++)D.push(A+t*(b-A)/(h-1));for(D.push(b),o=0;o<u;o++)S.push(P+o*(T-P)/(u-1));S.push(T);let f=D.length,c=S.length,U=0,B=1,q=i.x!==m.x||i.y!==m.y||i.z!==m.z,J=!1,rt=!1,ct=!1;q&&(B=2,A>0&&(J=!0,U+=u-1),b<Math.PI&&(rt=!0,U+=u-1),(T-P)%M.TWO_PI?(ct=!0,U+=(h-1)*2+1):U+=1);let w=c*f*B,x=new Float64Array(w*3),X=new Array(w).fill(!1),st=new Array(w).fill(!1),at=u*h*B,Tt=6*(at+U+1-(u+h)*B),r=kt.createTypedArray(at,Tt),Y=a.normal?new Float32Array(w*3):void 0,j=a.tangent?new Float32Array(w*3):void 0,H=a.bitangent?new Float32Array(w*3):void 0,Z=a.st?new Float32Array(w*2):void 0,V=new Array(f),G=new Array(f);for(t=0;t<f;t++)V[t]=At(D[t]),G[t]=Pt(D[t]);let K=new Array(c),Q=new Array(c);for(o=0;o<c;o++)Q[o]=Pt(S[o]),K[o]=At(S[o]);for(t=0;t<f;t++)for(o=0;o<c;o++)x[e++]=m.x*V[t]*Q[o],x[e++]=m.y*V[t]*K[o],x[e++]=m.z*G[t];let $=w/2;if(q)for(t=0;t<f;t++)for(o=0;o<c;o++)x[e++]=i.x*V[t]*Q[o],x[e++]=i.y*V[t]*K[o],x[e++]=i.z*G[t],X[$]=!0,t>0&&t!==f-1&&o!==0&&o!==c-1&&(st[$]=!0),$++;e=0;let F,L;for(t=1;t<f-2;t++)for(F=t*c,L=(t+1)*c,o=1;o<c-2;o++)r[e++]=L+o,r[e++]=L+o+1,r[e++]=F+o+1,r[e++]=L+o,r[e++]=F+o+1,r[e++]=F+o;if(q){let g=f*c;for(t=1;t<f-2;t++)for(F=g+t*c,L=g+(t+1)*c,o=1;o<c-2;o++)r[e++]=L+o,r[e++]=F+o,r[e++]=F+o+1,r[e++]=L+o,r[e++]=F+o+1,r[e++]=L+o+1}let d,l;if(q){if(J)for(l=f*c,t=1;t<c-2;t++)r[e++]=t,r[e++]=t+1,r[e++]=l+t+1,r[e++]=t,r[e++]=l+t+1,r[e++]=l+t;if(rt)for(d=f*c-c,l=f*c*B-c,t=1;t<c-2;t++)r[e++]=d+t+1,r[e++]=d+t,r[e++]=l+t,r[e++]=d+t+1,r[e++]=l+t,r[e++]=l+t+1}if(ct){for(t=1;t<f-2;t++)l=c*f+c*t,d=c*t,r[e++]=l,r[e++]=d+c,r[e++]=d,r[e++]=l,r[e++]=l+c,r[e++]=d+c;for(t=1;t<f-2;t++)l=c*f+c*(t+1)-1,d=c*(t+1)-1,r[e++]=d+c,r[e++]=l,r[e++]=d,r[e++]=d+c,r[e++]=l+c,r[e++]=l}let v=new Ct;a.position&&(v.position=new R({componentDatatype:N.DOUBLE,componentsPerAttribute:3,values:x}));let ft=0,I=0,tt=0,nt=0,Ft=w/2,ut,lt=ot.fromCartesian3(m),Lt=ot.fromCartesian3(i);if(a.st||a.normal||a.tangent||a.bitangent){for(t=0;t<w;t++){ut=X[t]?Lt:lt;let g=s.fromArray(x,t*3,yt),C=ut.geodeticSurfaceNormal(g,vt);if(st[t]&&s.negate(C,C),a.st){let _=ht.negate(C,Nt);Z[ft++]=Math.atan2(_.y,_.x)/M.TWO_PI+.5,Z[ft++]=Math.asin(C.z)/Math.PI+.5}if(a.normal&&(Y[I++]=C.x,Y[I++]=C.y,Y[I++]=C.z),a.tangent||a.bitangent){let _=Et,et=0,it;if(X[t]&&(et=Ft),!J&&t>=et&&t<et+c*2?it=s.UNIT_X:it=s.UNIT_Z,s.cross(it,C,_),s.normalize(_,_),a.tangent&&(j[tt++]=_.x,j[tt++]=_.y,j[tt++]=_.z),a.bitangent){let W=s.cross(C,_,Mt);s.normalize(W,W),H[nt++]=W.x,H[nt++]=W.y,H[nt++]=W.z}}}a.st&&(v.st=new R({componentDatatype:N.FLOAT,componentsPerAttribute:2,values:Z})),a.normal&&(v.normal=new R({componentDatatype:N.FLOAT,componentsPerAttribute:3,values:Y})),a.tangent&&(v.tangent=new R({componentDatatype:N.FLOAT,componentsPerAttribute:3,values:j})),a.bitangent&&(v.bitangent=new R({componentDatatype:N.FLOAT,componentsPerAttribute:3,values:H}))}if(E(n._offsetAttribute)){let g=x.length,C=n._offsetAttribute===wt.NONE?0:1,_=new Uint8Array(g/3).fill(C);v.applyOffset=new R({componentDatatype:N.UNSIGNED_BYTE,componentsPerAttribute:1,values:_})}return new _t({attributes:v,indices:r,primitiveType:dt.TRIANGLES,boundingSphere:pt.fromEllipsoid(lt),offsetAttribute:n._offsetAttribute})};var mt;O.getUnitEllipsoid=function(){return E(mt)||(mt=O.createGeometry(new O({radii:new s(1,1,1),vertexFormat:k.POSITION_ONLY}))),mt};var Kt=O;export{Kt as a};
