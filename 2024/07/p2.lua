local parser = require("lib.parser")

local p2 = {}

local function calibrate(value, operators, i, current)
  if i > #operators then
    return current == value
  end

  if current > value then
    return false
  end

  local operator = operators[i]

  local combined = current * (10 ^ math.floor(math.log10(operator) + 1)) + operator
  local addition = current + operator
  local multiplication = current * operator

  return calibrate(value, operators, i + 1, combined)
    or calibrate(value, operators, i + 1, addition)
    or calibrate(value, operators, i + 1, multiplication)
end

--- Solve Bridge Repair
---
--- @param input string
--- @return integer
p2.solve = function(input)
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

return p2
