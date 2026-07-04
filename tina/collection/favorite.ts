import type { Collection } from "tinacms";

const Favorite: Collection = {
  name: "favorite",
  label: "Favorites",
  path: "content/favorites",
  format: "json",
  fields: [
    {
      type: "string",
      name: "rawgId",
      label: "RAWG Game ID",
      required: true,
      isTitle: true,
    },
    {
      type: "string",
      name: "name",
      label: "Game Name",
      required: true,
    },
    {
      type: "image",
      name: "backgroundImage",
      label: "Cover Image",
    },
    {
      type: "datetime",
      name: "addedAt",
      label: "Added At",
    },
  ],
};

export default Favorite;