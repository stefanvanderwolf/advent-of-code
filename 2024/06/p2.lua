local Cycle = require("lib.collection.cycle")
local Matrix = require("lib.collection.matrix")
local Set = require("lib.collection.set")
local Vec2 = require("lib.vec2")
local Vec4 = require("lib.vec4")

local p2 = {}

local directions = Cycle.from({
  Vec2.new(0, -1), -- top
  Vec2.new(1, 0),  -- right
  Vec2.new(0, 1),  -- down
  Vec2.new(-1, 0)  -- left
})

--- @param matrix Matrix
local function patrol(matrix)
  local guard = matrix:first("^") or error("Missing guard")

  local directions_iter = directions:iter()
  local direction = directions_iter()

  local visited = Set.from({ guard })

  repeat
    local peek = matrix:get(guard + direction)

    if peek == nil then
      break
    end

    if peek == "#" then
      direction = directions_iter()
    else
      guard = guard + direction

      visited:insert(guard)
    end
  until guard == nil

  return visited
end

--- @param matrix Matrix
--- @param guard Vec2
--- @param obstruction Vec2
local function obstructions(matrix, guard, obstruction)
  local location = guard

  local directions_iter = directions:iter()
  local direction = directions_iter()

  local visited = Set.from({ Vec4.new(location.x, location.y, direction.x, direction.y) })
  local turned = false

  while true do
    local new_location = location + direction
    local peek = matrix:get(new_location)

    if peek == nil then
      return 0
    end

    if peek == "#" or obstruction == new_location then
      direction = directions_iter()
      turned = true
    else
      location = new_location

      local updated = Vec4.new(new_location.x, new_location.y, direction.x, direction.y)
      if visited:contains(updated) then
        return 1
      end

      if turned then
        visited:insert(updated)
      end
      turned = false
    end
  end
end

--- Solve Guard Gallivant
---
--- @param input string
--- @return integer
p2.solve = function(input)
  local matrix = Matrix.from(input)
  local guard = matrix:first("^") or error("Missing guard")
  local visited = patrol(matrix):remove(guard)

  local n = 0
  for visit in visited:iter() do
    n = n + obstructions(matrix, guard, visit)
  end
  return n
end

return p2
