--- @class Vec2
--- @field x integer
--- @field y integer

Vec2 = {}

Vec2.__index = Vec2

Vec2.__tostring = function(self)
  return string.format("Vec2(%d, %d)", self.x, self.y)
end

Vec2.__eq = function(self, other)
  return self.x == other.x and self.y == other.y
end

Vec2.__add = function(self, other)
  return Vec2.new(self.x + other.x, self.y + other.y)
end

Vec2.__sub = function(self, other)
  return Vec2.new(self.x - other.x, self.y - other.y)
end

function Vec2.new(x, y)
  local self = setmetatable({}, Vec2)
  self.x = x or 0
  self.y = y or 0
  return self
end

function Vec2:tohash()
  return tostring(self)
end

function Vec2:copy()
  return Vec2.new(self.x, self.y)
end

return Vec2
