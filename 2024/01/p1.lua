local parser = require("lib.parser")

local p1 = {}

--- Parse the left and right location ids
---
--- @param input string
--- @return integer[], integer[]
local function parse(input)
  --- @type integer[]
  local left_locations = {}
  --- @type integer[]
  local right_locations = {}

  for _, line in parser.lines(input) do
    local left, right = unpack(parser.numbers(line))

    table.insert(left_locations, left)
    table.insert(right_locations, right)
  end

  -- Sort the locations so I can compare each value per index.
  table.sort(left_locations)
  table.sort(right_locations)

  return left_locations, right_locations
end

--- Solve Historian Hysteria
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local n = 0
  local left_locations, right_locations = parse(input)

  local length = math.min(#left_locations, #right_locations)
  for i = 1, length do
    local distance = math.abs(left_locations[i] - right_locations[i])

    n = n + distance
  end

  return n
end

return p1
