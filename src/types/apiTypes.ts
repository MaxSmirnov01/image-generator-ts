export type GetDataArg = {
  text?: string;
  requestedPage?: number;
};

type Urls = {
  [key: string]: string;
};

export type UnsplashRandomPhoto = {
  alt_description: string;
  id: string;
  urls: Urls;
  user: { name: string };
};

export type UnsplashSearchPhoto = {
  results: UnsplashRandomPhoto[];
};

export type Error = {
  data: { errors: string[] };
  status: number;
};

export type Response = {
  data: UnsplashRandomPhoto[] | UnsplashSearchPhoto;
  status: number;
};
