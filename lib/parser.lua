local parser = {}

--- Create iterator for each line in `s`
---
--- @param s string
parser.lines = function(s)
  local lines = string.gmatch(s, "[^\r\n]+")
  local index = 0
  return function()
    index = index + 1
    local line = lines()
    if line ~= nil then
      return index, line
    end
  end
end

parser.groups = function(s, separator)
  return split(s, "\n\n")
end

function split(input, delimiter)
    local result = {}
    for match in (input .. delimiter):gmatch("(.-)" .. delimiter) do
        table.insert(result, match)
    end
    return result
end

parser.characters = function(s)
  local index = 0
  local len = #s

  return function()
    index = index + 1
    if index <= len then
      return index, string.sub(s, index, index)
    end
  end
end

--- Find all integers in the line
---
--- @examples
--- 12 51 -> {12, 51}
--- Hello 31, world 52 -> {31, 52}
---
--- @param s string
--- @return integer[]
parser.numbers = function(s, single)
  local pattern = "%d+"
  if single or false then
    pattern = "%d"
  end
  --- @type integer[]
  local integers = {}
  for num in s:gmatch(pattern) do
    table.insert(integers, tonumber(num))
  end
  return integers
end

return parser
