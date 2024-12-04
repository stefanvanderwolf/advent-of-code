local grid = require("lib.grid")
local set = require("lib.set")

local p2 = {}

local function find(word_search)
  local n = 0

  local remainders = set.new({ "M", "S" })

  for row = 2, word_search.height - 1 do
    for col = 2, word_search.width - 1 do
      local character = word_search[row][col]

      if character == "A" then
        local a = set.new({ word_search[row - 1][col - 1], word_search[row + 1][col + 1] })
        local b = set.new({ word_search[row + 1][col - 1], word_search[row - 1][col + 1] })

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
  local word_search = grid.new(input)
  return find(word_search)
end

return p2
