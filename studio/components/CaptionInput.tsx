import { useEffect, useRef } from 'react'
import { type StringInputProps, useFormValue, useClient, set } from 'sanity'

/**
 * Custom input for the caption field.
 * When a new image is selected and caption is blank,
 * auto-fills with the asset's original filename (e.g. "my-photo.jpg").
 * The user can freely edit or clear it afterwards.
 */
export function CaptionInput(props: StringInputProps) {
  const { onChange, value } = props
  const client = useClient({ apiVersion: '2024-01-01' })

  const image = useFormValue(['image']) as
    | { asset?: { _ref?: string } }
    | undefined
  const assetRef = image?.asset?._ref

  // Track which asset we last auto-filled from so we don't repeat
  const lastAutoFilledRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!assetRef) return
    if (assetRef === lastAutoFilledRef.current) return
    // Don't overwrite a caption the user has already typed
    if (value) return

    client
      .fetch<string | null>('*[_id == $id][0].originalFilename', { id: assetRef })
      .then((filename) => {
        if (filename) {
          lastAutoFilledRef.current = assetRef
          onChange(set(filename))
        }
      })
      .catch(() => {})
  }, [assetRef, value, client, onChange])

  return props.renderDefault(props)
}
