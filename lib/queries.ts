export const bioSettingsQuery = `*[_type == "bioSettings"][0] {
  name,
  siteTitle,
  role,
  portrait,
  bio,
  locationCode,
  socials,
  about,
  imprint,
  dataPrivacy
}`

export const galleryItemsQuery = `*[_type == "galleryItem" && visible == true] | order(orderRank asc) [0...8] {
  _id,
  image,
  caption
}`
