import { useState } from 'react'
import './App.scss'
import emojis from './data/emoji.json'

export default function App() {
  const [term, setTerm] = useState('')
  const [emoji, setEmoji] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const userInput = e.target.value
    setTerm(userInput)
  }

  const clearField = (e) => {
    e.preventDefault()
    setTerm([])
    setEmoji([])
    setErrorMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setEmoji([])
    setErrorMessage('')

    const result = emojis.filter((word) => word.emoji == `${term}`)

    if (result.length > 0) {
      setEmoji(result[0])
    } else if (result.length < 1) {
      setErrorMessage('Please enter an emoji.')
    } else {
      setErrorMessage('')
    }
  }

  return (
    <div>
      <form style={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
        <input type='text' maxLength='1' onChange={handleChange} value={term} />
        <div style={{ display: 'flex', flexFlow: 'row' }}>
          <button onClick={handleSubmit} style={{ flex: '1 1 auto' }}>
            Get Description
          </button>
          <button disabled={term.length ? false : true} onClick={clearField} style={{ flex: '1 1 auto' }}>
            Reset
          </button>
        </div>
      </form>

      {emoji ?
        <>
          <p>{emoji.emoji}</p>
          <p>{emoji.name}</p>
        </>
       : null}
      {errorMessage ? <p className='error'>{errorMessage}</p> : null}
    </div>
  )
}
