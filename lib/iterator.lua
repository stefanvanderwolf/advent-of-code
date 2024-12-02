local iterator = {}

iterator.previous = function(t)
  local length = #t

  assert(length > 1, string.format("Invalid length %d", length))

  local index = 2
  return function()
    if index > length then
      return nil
    end

    local previous = t[index - 1]
    local value = t[index]
    index = index + 1
    return previous, value
  end
end

return iterator
