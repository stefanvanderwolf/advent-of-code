local collection = {}

collection.find = function(haystack, needle)
  for index, value in ipairs(haystack) do
    if value == needle then
      return index, value
    end
  end

  return nil, nil
end

return collection
