local parser = require("lib.parser")

--- @alias Grid { height: integer, width: integer, [integer]: { [integer]: string } }

local grid = {}

--- Make a grid from the given string
--- 
--- @param s string
--- @return Grid
grid.new = function (s)
  local t = {}
  local row = 1
  for line in parser.lines(s) do
    t[row] = {}

    for col, character in parser.characters(line) do
      t[row][col] = character
    end

    row = row + 1
  end

  t.height = #t
  t.width = #t[1]

  return t
end

--- Get value if in bounds
---
--- @param g Grid
--- @param row integer
--- @param col integer
--- @return string | nil
grid.get = function(g, row, col)
  if row < 1 or row > g.height then
    return nil
  end

  if col < 1 or col > g.width then
    return nil
  end

  return g[row][col]
end

return grid
