import { useState } from 'react'
import { Button } from 'react-bootstrap'
import TextInput from 'components/TextInput/TextInput'

const TagForm = ({ onAddTags }) => {
  const [tagInput, setTagInput] = useState('')

  const handleAddTags = () => {
    const newTags = tagInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)

    if (newTags.length > 0) {
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
      <Button onClick={handleAddTags} className="mt-2 w-100">
        Add Tags
      </Button>
    </div>
  )
}

export default TagForm
