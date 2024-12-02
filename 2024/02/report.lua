local iterator = require("lib.iterator")
local comparator = require("lib.comparator")

local report = {}
---
--- Create comparator based on previous and current level
---
--- @param previous integer
--- @param level integer
--- @return fun(integer, integer): boolean
local function create_is_level_change_comparator(previous, level)
  if previous < level then
    return comparator.ascending
  else
    return comparator.descending
  end
end

report.is_safe = function(levels)
  local length = #levels
  if length < 2 then
    return true
  end

  -- Create once because the whole list should follow that direction
  local is_level_change_safe = create_is_level_change_comparator(levels[1], levels[2])

  for previous, level in iterator.previous(levels) do
    local delta = math.abs(previous - level)
    if delta < 1 or delta > 3 or not is_level_change_safe(previous, level) then
      return false
    end
  end

  return true
end

return report
