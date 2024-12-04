local grid = require("lib.grid")
local iterator = require("lib.iterator")

local p1 = {}

local function find(word_search, word)
  local n = 0
  local length = #word
  for row, line in ipairs(word_search) do
    for col, character in ipairs(line) do
      if character == string.sub(word, 1, 1) then
        for _, direction in ipairs(iterator.neighbours) do
          for i = 2, length do
            local d_row = row + (i - 1) * direction.row
            local d_col = col + (i - 1) * direction.col
            local target = string.sub(word, i, i)
            local current = grid.get(word_search, d_row, d_col)

            if current == nil or current ~= target then
              goto continue
            end
          end

          n = n + 1

          ::continue::
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
p1.solve = function(input)
  local word_search = grid.new(input)

  return find(word_search, "XMAS")
end

return p1
