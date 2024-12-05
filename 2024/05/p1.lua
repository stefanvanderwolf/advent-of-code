local collection = require("lib.collection")
local parser = require("2024.05.parser")

local p1 = {}

--- @param updates integer[]
--- @param rules Rule[]
local function is_ordered(updates, rules)
  for _, rule in ipairs(rules) do
    local a = collection.find(updates, rule.before)
    local b = collection.find(updates, rule.after)

    if a and b and a > b then
      return false
    end
  end

  return true
end

--- Solve Print Queue
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local n = 0
  local all_updates, rules = parser.parse(input)
  for _, updates in ipairs(all_updates) do
    if is_ordered(updates, rules) then
      n = n + (updates[math.ceil(#updates / 2)])
    end
  end
  return n
end

return p1
