export const bioSettingsQuery = `*[_type == "bioSettings"][0] {
  name,
  siteTitle,
  role,
  portrait,
  bio,
  locationCode,
  showLocationClock,
  socials,
  about,
  about2,
  imprint,
  dataPrivacy
}`

export const galleryItemsQuery = `*[_type == "galleryItem" && visible == true] | order(orderRank asc) {
  _id,
  image,
  "videoUrl": video.asset->url,
  caption
}`

export const gallery2ItemsQuery = `*[_type == "galleryItem2" && visible == true] | order(orderRank asc) {
  _id,
  image,
  "videoUrl": video.asset->url,
  caption
}`

export const gallery3ItemsQuery = `*[_type == "galleryItem3" && visible == true] | order(orderRank asc) {
  _id,
  image,
  "videoUrl": video.asset->url,
  caption
}`
