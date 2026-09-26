export interface VideoProps {
  src: string;
  // @ts-expect-error - not imported
  caption?: ReactNode;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  as?: "video" | "gif";
}

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

type KeyValue = { key: string; value: string; enabled: boolean };

export interface ApiPlaygroundProps {
  initialUrl: string;
  initialMethod?: HttpMethod;
  initialQuery?: KeyValue[];
  disableQuery?: boolean;
  initialHeaders?: KeyValue[];
  disableHeaders?: boolean;
  initialBody?: string;
  disableBody?: boolean;
}
