local collection = {}

collection.find = function(haystack, needle)
  for index, value in ipairs(haystack) do
    if value == needle then
      return index, value
    end
  end

  return nil, nil
end

collection.swap = function(t, i, j)
    t[i], t[j] = t[j], t[i]
end

return collection
