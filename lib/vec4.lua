--- @class Vec4
--- @field x integer
--- @field y integer
--- @field z integer
--- @field w integer

Vec4 = {}

Vec4.__index = Vec4

Vec4.__tostring = function(self)
  return string.format("Vec4(%d, %d, %d, %d)", self.x, self.y, self.z, self.w)
end

Vec4.__eq = function(self, other)
  return self.x == other.x and self.y == other.y and self.z == other.z and self.w == other.w
end

Vec4.__add = function(self, other)
  return Vec4.new(self.x + other.x, self.y + other.y, self.z + other.z, self.w + other.w)
end

Vec4.__sub = function(self, other)
  return Vec4.new(self.x - other.x, self.y - other.y, self.z - other.z, self.w - self.w)
end

function Vec4.new(x, y, z, w)
  local self = setmetatable({}, Vec4)
  self.x = x or 0
  self.y = y or 0
  self.z = z or 0
  self.w = w or 0
  return self
end

function Vec4:tohash()
  return tostring(self)
end

function Vec4:copy()
  return Vec4.new(self.x, self.y, self.z, self.w)
end

return Vec4
