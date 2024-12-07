local parser = require("lib.parser")

local p1 = {}

local function calibrate(value, operators, i, current)
  if i > #operators then
    return current == value
  end

  if current > value then
    return false
  end

  local operator = operators[i]

  local addition = current + operator
  local multiplication = current * operator

  return calibrate(value, operators, i + 1, addition)
    or calibrate(value, operators, i + 1, multiplication)
end

--- Solve Bridge Repair
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local n = 0
  for _, line in parser.lines(input) do
    local nums = parser.numbers(line)
    local value = nums[1]
    table.remove(nums, 1)
    if calibrate(value, nums, 2, nums[1]) then
      n = n + value
    end
  end
  return n
end

return p1
