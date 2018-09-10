//Ex: Pattern, Maker, Color, Garment Type
export type Category = {
  id: string,
  name: string
}

//Ex: Closet Case File (Maker), Blue (Color), Dress (Garment Type)
export type Tag = {
  id: string,
  name: string,
  category: string
}

export type PostPart = {
  content?: string
}

export type Post = {
  id: string,
  title: string,
  tags: ReadonlyArray<string>,
  author: string,
  archived: boolean,
  parts: ReadonlyArray<PostPart>
  summary_image_url: string;
}
