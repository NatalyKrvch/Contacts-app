import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { EMPTY_LENGTH } from 'constants'
import TextInput from 'components/TextInput/TextInput'

const TagForm = ({ onAddTags }) => {
  const [tagInput, setTagInput] = useState('')

  const handleAddTags = () => {
    const newTags = tagInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    if (newTags.length > EMPTY_LENGTH) {
      onAddTags(newTags)
      setTagInput('')
    }
  }

  return (
    <div>
      <TextInput
        value={tagInput}
        onChange={setTagInput}
        placeholder="Add new Tags separated by commas"
      />
      <Button variant='success' onClick={handleAddTags} className="mt-3 w-100">
        Add Tags
      </Button>
    </div>
  )
}

export default TagForm
