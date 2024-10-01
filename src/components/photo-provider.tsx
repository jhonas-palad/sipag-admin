"use client";
import React from "react";
import { PhotoProvider as RPVPhotoprovider, PhotoView } from "react-photo-view";
import { PhotoViewProps } from "react-photo-view/dist/PhotoView";
interface PhotoProviderProps {
  src: string;
  children: PhotoViewProps["children"];
}
export const PhotoProvider = ({ src, children }: PhotoProviderProps) => {
  if (!src) {
    return null;
  }
  return (
    <RPVPhotoprovider>
      <PhotoView src={src}>{children}</PhotoView>
    </RPVPhotoprovider>
  );
};
