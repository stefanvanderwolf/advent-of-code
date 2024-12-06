local Matrix = require("lib.collection.matrix")
local Cycle = require("lib.collection.cycle")
local Set = require("lib.collection.set")
local Vec2 = require("lib.vec2")

local p1 = {}

--- @param matrix Matrix
local function patrol(matrix)
  local guard = matrix:first("^") or error("Missing guard")

  local directions = Cycle.from({
    Vec2.new(0, -1), -- top
    Vec2.new(1, 0), -- right
    Vec2.new(0, 1), -- down
    Vec2.new(-1, 0) -- left
  })

  local direction = directions:next()

  local visited = Set.from({ guard })

  repeat
    local peek = matrix:get(guard + direction)

    if peek == nil then
      break
    end

    if peek == "#" then
      direction = directions:next()
    else
      guard = guard + direction

      visited:insert(guard)
    end
  until guard == nil

  return visited.count
end

--- Solve Guard Gallivant
---
--- @param input string
--- @return integer
p1.solve = function(input)
  return patrol(Matrix.from(input))
end

return p1
