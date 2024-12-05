local collection = require("lib.collection")
local parser = require("2024.05.parser")

local p2 = {}

--- @param updates integer[]
--- @param rules Rule[]
local function reorder(updates, rules)
  table.sort(updates, function(a, b)
    for _, rule in ipairs(rules) do
      if rule.before == a and rule.after == b then
        return true
      end
    end

    return false
  end)

  return updates
end

--- @param updates integer[]
--- @param rules Rule[], fixed boolean
local function ordered(updates, rules)
  for _, rule in ipairs(rules) do
    local a = collection.find(updates, rule.before)
    local b = collection.find(updates, rule.after)

    if a and b and a > b then
      return reorder(updates, rules), true
    end
  end

  return updates, false
end

p2.solve = function(input)
  local n = 0

  local all_updates, rules = parser.parse(input)
  for _, updates in ipairs(all_updates) do
    local updated, fixed = ordered(updates, rules)
    if fixed then
      n = n + (updated[math.ceil(#updated / 2)])
    end
  end
  return n
end

return p2
