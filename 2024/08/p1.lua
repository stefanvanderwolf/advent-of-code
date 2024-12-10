local Matrix = require("lib.collection.matrix")
local Set = require("lib.collection.set")
local Vec2 = require("lib.vec2")

local p1 = {}

--- Solve Resonant Collinearity
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local antinodes = Set.new()
  local matrix = Matrix.from(input)
  local antennas = {}
  for vec2, ch in matrix:iter() do
    if ch ~= "." then
      local a = antennas[ch] or {}
      table.insert(a, vec2)
      antennas[ch] = a
    end
  end

  for _, vec2s in pairs(antennas) do
    for i, vec2 in ipairs(vec2s) do
      for j, other in ipairs(vec2s) do
        if i ~= j then
          local delta = Vec2.new(math.abs(vec2.x - other.x), math.abs(vec2.y - other.y))
          local lower = other
          local upper = vec2
          if vec2.y < other.y then
            lower = vec2
            upper = other
          end

          if lower.x > upper.x then
            lower = Vec2.new(lower.x + delta.x, lower.y - delta.y)
            upper = Vec2.new(upper.x - delta.x, upper.y + delta.y)
          else
            lower = Vec2.new(lower.x - delta.x, lower.y - delta.y)
            upper = Vec2.new(upper.x + delta.x, upper.y + delta.y)
          end

          if matrix:get(lower) ~= nil then
            antinodes:insert(Vec2.new(lower.x, lower.y))
          end
          if matrix:get(upper) ~= nil then
            antinodes:insert(Vec2.new(upper.x, upper.y))
          end
        end
      end
    end
  end

  return antinodes.count
end

return p1
