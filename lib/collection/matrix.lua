local parser = require("lib.parser")
local Vec2 = require("lib.vec2")

--- @class Matrix
--- @field private _storage table
--- @field public height integer
--- @field public width integer
local Matrix = {}

Matrix.__index = Matrix


Matrix.__tostring = function(self)
  local length = #(tostring(self.height)) + 2
  local function pad(str)
    return str .. string.rep(" ", length - #str)
  end

  local result = ""
  for row = 1, self.height do
    if row % 2 == 0 then
      result = result .. "\27[1m"
    end
    result = result .. pad(string.format("%d:", row))
    for col = 1, self.width do
      local value = self._storage[row][col]
      result = string.format("%s%s", result, self._storage[row][col])
    end
    result = result .. "\27[0m"
    if row < self.height then
      result = result .. "\n"
    end
  end
  return result
end

--- @return Matrix
function Matrix.new()
  local self = setmetatable({}, Matrix)
  self.height = 0
  self.width = 0
  self._storage = {}
  return self
end

--- @param s string
--- @return Matrix
function Matrix.from(s)
  local matrix = Matrix.new()

  for row, line in parser.lines(s) do
    matrix._storage[row] = {}
    matrix.width = #line
    matrix.height = row

    for col, ch in parser.characters(line) do
      matrix:set(Vec2.new(col, row), ch)
    end
  end

  return matrix
end

--- @param vec2 Vec2
--- @param value any
--- @return Matrix
function Matrix:set(vec2, value)
  self._storage[vec2.y][vec2.x] = value
  return self
end

--- First vec2 matching value
---
--- @param value any
--- @return Vec2?
function Matrix:first(value)
  for row = 1, self.height do
    for col = 1, self.width do
      if self._storage[row][col] == value then
        return Vec2.new(col, row)
      end
    end
  end

  return nil
end

function Matrix:iter()
  local row = 1
  local col = 0
  return function()
    if col < self.width then
      col = col + 1
    else
      col = 1
      row = row + 1
    end

    if row > self.height then
      return nil
    end

    local vec2 = Vec2.new(row, col)
    return vec2, self:get(vec2)
  end
end

--- Get value or nil if not found
---
--- @param vec2 Vec2
--- @return any?
function Matrix:get(vec2)
  if vec2.y < 1 or vec2.y > self.height then
    return nil
  end

  if vec2.x < 1 or vec2.x > self.width then
    return nil
  end

  return self._storage[vec2.y][vec2.x]
end

return Matrix
