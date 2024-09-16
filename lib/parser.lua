local parser = {}

--- Create iterator for each line in `s`
---
--- @param s string
--- @return fun():string, ...
parser.lines = function(s)
  return string.gmatch(s, "[^\r\n]+")
end

--- Find all integers in the line
---
--- @examples
--- 12 51 -> {12, 51}
--- Hello 31, world 52 -> {31, 52}
---
--- @param s string
--- @return integer[]
parser.numbers = function(s)
  --- @type integer[]
  local integers = {}
  for num in s:gmatch("%d+") do
    table.insert(integers, tonumber(num))
  end
  return integers
end

return parser
