local Matrix = require("lib.collection.matrix")
local Vec2 = require("lib.vec2")
local Set = require("lib.collection.set")

local p2 = {}

--- @param matrix Matrix
local function find(matrix)
  local n = 0

  local remainders = Set.from({ "M", "S" })
  for row = 2, matrix.height - 1 do
    for col = 2, matrix.width - 1 do
      local character = matrix:get(Vec2.new(col, row))
      if character == "A" then
        local a = Set.from({ matrix:get(Vec2.new(col - 1, row - 1)), matrix:get(Vec2.new(col + 1, row + 1)) })
        local b = Set.from({ matrix:get(Vec2.new(col + 1, row - 1)), matrix:get(Vec2.new(col - 1, row + 1)) })

        if a == remainders and b == remainders then
          n = n + 1
        end
      end
    end
  end

  return n
end

--- Solve Ceres Search
---
--- @param input string
--- @return integer
p2.solve = function(input)
  return find(Matrix.from(input))
end

return p2
