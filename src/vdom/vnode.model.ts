export interface Properties {
  [key: string]: string;
}

export interface VNodes {
  tag: string;
  properties: Properties;
  children: VNode[];
}

export type TextVNode = "string";

export type VNode = TextVNode | VNodes;
