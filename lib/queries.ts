export const bioSettingsQuery = `*[_type == "bioSettings"][0] {
  name,
  siteTitle,
  role,
  portrait,
  bio,
  locationCode,
  socials,
  about,
  about2,
  imprint,
  dataPrivacy
}`

export const galleryItemsQuery = `*[_type == "galleryItem" && visible == true] | order(orderRank asc) [0...8] {
  _id,
  image,
  caption
}`

export const gallery2ItemsQuery = `*[_type == "galleryItem2" && visible == true] | order(orderRank asc) [0...8] {
  _id,
  image,
  caption
}`
