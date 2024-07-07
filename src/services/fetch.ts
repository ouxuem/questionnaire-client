const HOST = 'http://localhost:3005'

export const get = async (url: string) => {
  const res = await fetch(`${HOST}${url}`)
  const data = await res.json()
  return data
}

export const post = async (url: string, body: any) => {
  const res = await fetch(`${HOST}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return data
}
