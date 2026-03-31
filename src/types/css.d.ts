declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}

declare module "*.module.css" {
  const styles: Record<string, string>;
  export default styles;
}

declare module "@splidejs/splide/dist/css/splide.min.css" {
  const content: undefined;
  export default content;
}

declare module "@splidejs/react-splide/css" {
  const content: undefined;
  export default content;
}
