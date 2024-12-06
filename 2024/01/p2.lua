local parser = require("lib.parser")

local p2 = {}

--- Parse the locations and the frequencies
---
--- @param input string
--- @return integer[], table<integer, integer>
local function parse(input)
  --- @type integer[]
  local locations = {}
  --- Defaults to 0 in case the location cannot be found.
  --- @type table<integer, integer>
  local frequencies = {}
  setmetatable(frequencies, {
    __index = function()
      return 0
    end
  })

  for _, line in parser.lines(input) do
    local left, right = unpack(parser.numbers(line))

    table.insert(locations, left)
    frequencies[right] = frequencies[right] + 1
  end

  return locations, frequencies
end

--- Solve Historian Hysteria
---
--- @param input string
--- @return integer
p2.solve = function(input)
  local n = 0
  local locations, frequencies = parse(input)

  for _, location in ipairs(locations) do
    n = n + location * frequencies[location]
  end

  return n
end

return p2
