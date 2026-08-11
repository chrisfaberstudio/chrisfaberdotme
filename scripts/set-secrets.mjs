/**
 * Sets GitHub Actions repository secrets using libsodium sealed box encryption.
 * Run: GITHUB_TOKEN=xxx node scripts/set-secrets.mjs
 * Requires: npm install libsodium-wrappers --no-save
 */
import sodium from 'libsodium-wrappers'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO = 'chrisfaberstudio/chrisfaberdotme'
const SECRETS = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: 'dq8nrxz8',
  NEXT_PUBLIC_SANITY_DATASET: 'production',
}

if (!GITHUB_TOKEN) { console.error('GITHUB_TOKEN required'); process.exit(1) }

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
  'User-Agent': 'chrisfaberdotme-setup',
}

async function getPublicKey() {
  const res = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/public-key`, { headers })
  if (!res.ok) throw new Error(`getPublicKey: ${res.status} ${await res.text()}`)
  return res.json()
}

async function putSecret(name, encryptedValue, keyId) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/secrets/${name}`,
    { method: 'PUT', headers, body: JSON.stringify({ encrypted_value: encryptedValue, key_id: keyId }) }
  )
  if (!res.ok && res.status !== 204) throw new Error(`putSecret ${name}: ${res.status} ${await res.text()}`)
}

async function main() {
  await sodium.ready

  console.log('Fetching repo public key...')
  const { key, key_id } = await getPublicKey()
  const keyBytes = Buffer.from(key, 'base64')

  for (const [name, value] of Object.entries(SECRETS)) {
    const msgBytes = Buffer.from(value, 'utf8')
    // GitHub requires crypto_box_seal (NaCl sealed box)
    const encrypted = sodium.crypto_box_seal(msgBytes, keyBytes)
    await putSecret(name, Buffer.from(encrypted).toString('base64'), key_id)
    console.log(`✓  ${name}`)
  }
  console.log('Done.')
}

main().catch(e => { console.error(e.message); process.exit(1) })
