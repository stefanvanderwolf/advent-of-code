local parser = require("lib.parser")

local p = {}
--- @alias Rule { before: integer, after: integer }

--- @return [integer[]], Rule[]
p.parse = function(s)
  local groups = parser.groups(s)

  --- @type Rule[]
  local rules = {}
  for line in parser.lines(groups[1]) do
    local nums = parser.numbers(line)
    table.insert(rules, { before = nums[1], after = nums[2] })
  end

  local updates = {}
  for line in parser.lines(groups[2]) do
    table.insert(updates, parser.numbers(line))
  end

  return updates, rules
end


return p
