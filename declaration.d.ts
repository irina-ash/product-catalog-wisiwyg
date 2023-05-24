declare module "*.module.scss" {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module 'react-draft-wysiwyg/dist/react-draft-wysiwyg';

declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module "*.png";
declare module "*.jpg" {
    const value: any;
    export default value;
}