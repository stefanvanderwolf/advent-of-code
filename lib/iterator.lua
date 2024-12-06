local iterator = {}

iterator.neighbours = {}
for y = -1, 1 do
    for x = -1, 1 do
      if x ~= 0 or y ~= 0 then
        table.insert(iterator.neighbours, { row = y, col = x })
      end
    end
end

iterator.diagonals = {
  { row = -1, col = -1 },
  { row = 1, col = 1 },
  { row = 1, col = -1 },
  { row = -1, col = 1 },
}

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
