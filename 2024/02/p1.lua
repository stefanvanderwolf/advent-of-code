local parser = require("lib.parser")
local report = require("2024.02.report")

local p1 = {}

--- Solve Red-Nosed Reports
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local n = 0

  for _, line in parser.lines(input) do
    local levels = parser.numbers(line)
    if report.is_safe(levels) then
      n = n + 1
    end
  end

  return n
end

return p1
