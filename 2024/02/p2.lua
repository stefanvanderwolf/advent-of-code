local parser = require("lib.parser")
local copy = require("lib.copy")
local report = require("2024.02.report")

local p2 = {}

local function is_safe_with_tolerate(levels)
  if report.is_safe(levels) then
    return true
  end

  local length = #levels
  for i = 1, length do
    local modified_levels = copy.shallow(levels)
    table.remove(modified_levels, i)

    if report.is_safe(modified_levels) then
      return true
    end
  end

  return false
end

--- Solve Red-Nosed Reports
---
--- @param input string
--- @return integer
p2.solve = function(input)
  local n = 0

  for _, line in parser.lines(input) do
    local levels = parser.numbers(line)
    if is_safe_with_tolerate(levels) then
      n = n + 1
    end
  end

  return n
end

return p2
