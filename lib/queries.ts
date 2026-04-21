export const bioSettingsQuery = `*[_type == "bioSettings"][0] {
  name,
  siteTitle,
  role,
  portrait,
  bio,
  locationCode,
  socials,
  imprint,
  dataPrivacy,
  copyrightYear,
  seo
}`

export const galleryItemsQuery = `*[_type == "galleryItem" && visible == true] | order(date desc) [0...8] {
  _id,
  image,
  caption,
  date
}`
