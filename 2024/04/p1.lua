local iterator = require("lib.iterator")
local Matrix = require("lib.collection.matrix")
local Vec2 = require("lib.vec2")

local p1 = {}

--- @param matrix Matrix
--- @param word string
local function find(matrix, word)
  local n = 0
  local length = #word

  for vec2, character in matrix:iter() do
    if character == string.sub(word, 1, 1) then
      for _, direction in ipairs(iterator.neighbours) do
        for i = 2, length do
          local row = vec2.y + (i - 1) * direction.row
          local col = vec2.x + (i - 1) * direction.col
          local target = string.sub(word, i, i)
          local current = matrix:get(Vec2.new(col, row))
          if current == nil or current ~= target then
            goto continue
          end
        end

        n = n + 1

        ::continue::
      end
    end
  end

  return n
end

--- Solve Ceres Search
---
--- @param input string
--- @return integer
p1.solve = function(input)
  local matrix = Matrix.from(input)

  return find(matrix, "XMAS")
end

return p1
