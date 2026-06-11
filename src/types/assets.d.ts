declare module "*.png" {
  const content: { src: string; height: number; width: number; blurDataURL?: string };
  export default content;
}

declare module "*.jpg" {
  const content: { src: string; height: number; width: number; blurDataURL?: string };
  export default content;
}

declare module "*.jpeg" {
  const content: { src: string; height: number; width: number; blurDataURL?: string };
  export default content;
}

declare module "*.svg" {
  const content: { src: string; height: number; width: number };
  export default content;
}

declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: { src: string; height: number; width: number };
  export default content;
}
