export const trimText = (text, length) => {
    //to clear from multiply backspaces
    let clearedText = text.replace(/([\n]{2,})/g, '\n\n')
  
    if (clearedText.length < length) return text
  
    let shortText = clearedText.slice(0, length).split(' ')
  
    //to cut by the whole word not to wrap it
    shortText = shortText.slice(0, shortText.length - 1)
  
    const resultText = shortText.join(' ') + '...'
  
    return resultText
  }