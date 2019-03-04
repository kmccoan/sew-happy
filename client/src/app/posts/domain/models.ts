// Ex:Pattern, Maker, Color, Garment Type
export type Category = {
  id: string,
  name: string
};

// Ex: Closet Case File (Maker), Blue (Color), Dress (Garment Type)
export type Tag = {
  id: string,
  name: string,
  category: string
};

export type PostPart = {
  content?: string
};

export type PostID = string;

export type Post = {
  id: PostID,
  title?: string,
  tags?: ReadonlyArray<string>,
  author?: string,
  archived?: boolean,
  summary_image_url?: string;
  content?: PostContent
};

export type PostContent = {
  post_id: string,
  parts: ReadonlyArray<PostPart>
};
